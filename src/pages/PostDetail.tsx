import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import { useParams } from 'react-router-dom';
import CommentEditor from '../components/CommentEditor';
import GroupList from '../components/GroupList';
import Sidenav from '../components/Sidenav';
import UserProfileInfo from '../components/UserProfileInfo';
import { moods } from '../constants';
import { Group, Mood, Post, User } from '../interfaces';
import MainLayout from '../layout/MainLayout';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ChatIcon, EyeIcon, ThumbUpIcon } from '@heroicons/react/solid';
dayjs.extend(relativeTime);

function PostDetailPage({}) {
  const [post, setPost] = React.useState<Post>(null);
  const [user, setUser] = React.useState<User>(null);
  const [allGroups, setAllGroups] = React.useState<Group[]>([]);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState<string>('');
  const [mood, setMood] = React.useState<Mood>(moods[5]);
  const [currentUserLikedPost, setCurrentUserLikedPost] =
    React.useState<boolean>(false);
  const [currentUserUnlikedPost, setCurrentUserUnlikedPost] =
    React.useState<boolean>(false);

  const profilePic = window.localStorage.getItem('profilePic');
  const currentlyLoggedInUser = window.localStorage.getItem('userId');

  const fetchData = async () => {
    fetchPost();
    const groupResponse = await fetch('http://localhost:4000/groups');
    const commentResponse = await fetch(
      `http://localhost:4000/comments/post/${id}`,
    );
    const groupData = await groupResponse.json();
    const commentsResponse = await commentResponse.json();
    setAllGroups(groupData);
    setComments(commentsResponse);
  };

  const fetchPost = async () => {
    const postResponse = await fetch(`http://localhost:4000/posts/post/${id}`);
    const postData = await postResponse.json();
    setPost(postData);
  };

  const fetchUser = async (userId: number) => {
    const userResponse = await fetch(`http://localhost:4000/users/${userId}`);
    const userData = await userResponse.json();
    setUser(userData);
  };

  const handleLikePost = async () => {
    await axios.post(`http://localhost:4000/likes`, {
      postId: post.id,
      userId: currentlyLoggedInUser,
    });
    setCurrentUserUnlikedPost(false);
    setCurrentUserLikedPost(true);
  };

  const handleUnlikePost = async () => {
    await axios.delete(`http://localhost:4000/likes`, {
      data: {
        postId: post.id,
        userId: currentlyLoggedInUser,
      },
    });
    setCurrentUserLikedPost(false);
    setCurrentUserUnlikedPost(true);
  };

  const handleLikeButtonClick = () => {
    if (userHasLikedThePost) {
      handleUnlikePost();
    } else {
      handleLikePost();
    }
  };

  React.useEffect(() => {
    if (post) {
      fetchUser(post.userId);
    }
  }, [post]);

  React.useEffect(() => {
    fetchData();
  }, []);

  // grab the id for the post using useParam
  const { id } = useParams();

  // useEffect + useState to grab the post details from the backend to your state?

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCommentObj = {
      content: newComment,
      mood: mood.value,
      userId: 1,
      postId: post.id,
    };
    await axios.post('http://localhost:4000/comments', newCommentObj);

    fetchData();
    setNewComment('');
    setMood(moods[5]);
  };

  const userHasLikedThePost =
    (post?.likes.map((like) => like.userId).includes(+currentlyLoggedInUser) ||
      currentUserLikedPost) &&
    !currentUserUnlikedPost;

  return (
    <MainLayout
      leftNav={
        <div className='divide-y divide-gray-300'>
          <Sidenav />
          <GroupList groups={allGroups} />
        </div>
      }
      rightNav={user && <UserProfileInfo user={user} />}
    >
      {post && (
        <div className='space-y-8'>
          <div className='p-4 bg-white rounded-lg shadow-sm'>
            <h1 className='mb-2 text-3xl font-semibold'>{post.title}</h1>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <span className='text-sm text-gray-500'>
                  Published on {dayjs(post.createdAt).format('MMM DD, YYYY')}
                </span>
              </div>
              <p>{post.content}</p>
              <div className='flex space-x-4'>
                <span className='flex items-center space-x-1 text-sm text-gray-500'>
                  <EyeIcon className='w-5 h-5 text-gray-500' />
                  <span>{post.viewCount}</span>
                </span>
                <span className='flex items-center space-x-1 text-sm text-gray-500'>
                  <ThumbUpIcon
                    onClick={handleLikeButtonClick}
                    className={`w-5 h-5 text-${
                      userHasLikedThePost ? 'red' : 'gray'
                    }-500`}
                  />
                  <span>
                    {userHasLikedThePost
                      ? post.likes.length + 1
                      : post.likes.length || 0}
                  </span>
                </span>
                <span className='flex items-center space-x-1 text-sm text-gray-500'>
                  <ChatIcon className='w-5 h-5 text-gray-500' />
                  <span>{comments?.length || 0}</span>
                </span>
              </div>
            </div>
          </div>
          <CommentEditor
            profilePic={profilePic}
            newComment={newComment}
            mood={mood}
            setNewComment={setNewComment}
            setMood={setMood}
            handleCommentSubmit={handleCommentSubmit}
          />
          <div>
            <ul className='divide-y divide-gray-200'>
              {comments.map((comment) => {
                const mood = moods.find((mood) => mood.value === comment.mood);
                return (
                  <li key={comment.id} className='py-4'>
                    <div className='flex space-x-3'>
                      <img
                        className='w-6 h-6 rounded-full'
                        src={comment.user.profilePic}
                        alt=''
                      />
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center justify-between'>
                          <h3 className='flex space-x-2 text-sm font-medium'>
                            {comment.user.username}{' '}
                            {
                              <mood.icon
                                className='flex-shrink-0 w-5 h-5 text-red-500'
                                aria-hidden='true'
                              />
                            }
                            <div className='flex items-center space-x-.5'>
                              <ThumbUpIcon className={`w-5 h-5 text-red-500`} />
                              <span className='text-xs'>100</span>
                            </div>
                          </h3>
                          <p className='text-sm text-gray-500'>
                            {dayjs(comment.createdAt).fromNow()}
                          </p>
                        </div>
                        <p className='text-sm text-gray-500'>
                          {comment.content}
                        </p>
                        <div className='flex space-x-2'>
                          <p className='text-sm text-blue-500 underline cursor-pointer'>
                            like
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default PostDetailPage;
