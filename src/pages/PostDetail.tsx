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
dayjs.extend(relativeTime);

function PostDetailPage({}) {
  const [post, setPost] = React.useState<Post>(null);
  const [user, setUser] = React.useState<User>(null);
  const [allGroups, setAllGroups] = React.useState<Group[]>([]);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState<string>('');
  const [mood, setMood] = React.useState<Mood>(moods[5]);

  const profilePic = window.localStorage.getItem('profilePic');

  const fetchData = async () => {
    const postResponse = await fetch(`http://localhost:4000/posts/post/${id}`);
    const groupResponse = await fetch('http://localhost:4000/groups');
    const commentResponse = await fetch(
      `http://localhost:4000/comments/post/${id}`,
    );
    const groupData = await groupResponse.json();
    const postData = await postResponse.json();
    const commentsResponse = await commentResponse.json();
    setPost(postData);
    setAllGroups(groupData);
    setComments(commentsResponse);
  };

  const fetchUser = async (userId: number) => {
    const userResponse = await fetch(`http://localhost:4000/users/${userId}`);
    const userData = await userResponse.json();
    setUser(userData);
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
            <span className='text-sm text-gray-500'>
              {dayjs(post.createdAt).format('MMM DD, YYYY')}
            </span>
            <p>{post.content}</p>
            <div>
              {post.comments &&
                post.comments.length &&
                post.comments.map((comment) => (
                  <div>
                    <p>{comment}</p>
                  </div>
                ))}
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
                          </h3>
                          <p className='text-sm text-gray-500'>
                            {dayjs(comment.createdAt).fromNow()}
                          </p>
                        </div>
                        <p className='text-sm text-gray-500'>
                          {comment.content}
                        </p>
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
