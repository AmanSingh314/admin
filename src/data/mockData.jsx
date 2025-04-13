export const users = [
    { id: 1, phoneNumber: '1234567890', gender: 'Male' },
    { id: 2, phoneNumber: '9876543210', gender: 'Female' },
    { id: 3, phoneNumber: '1234567810', gender: 'Male' },
    { id: 4, phoneNumber: '9876543110', gender: 'Female' },
    { id: 5, phoneNumber: '1234561890', gender: 'Male' },
    { id: 6, phoneNumber: '9876523210', gender: 'Female' },
    { id: 7, phoneNumber: '1234367890', gender: 'Male' },
    { id: 8, phoneNumber: '9876443210', gender: 'Female' },
    { id: 9, phoneNumber: '1234467890', gender: 'Male' },
    { id: 10, phoneNumber: '9875543210', gender: 'Female' },
    { id: 11, phoneNumber: '1236567890', gender: 'Male' },
    { id: 12, phoneNumber: '9876543210', gender: 'Female' },
    { id: 13, phoneNumber: '1238567890', gender: 'Male' },
    { id: 14, phoneNumber: '9878543210', gender: 'Female' },
    { id: 15, phoneNumber: '1234567890', gender: 'Male' },
    { id: 16, phoneNumber: '9872543210', gender: 'Female' },
  ];
  
  export const feeds = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    content: `Post ${i + 1}`,
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
    shares: Math.floor(Math.random() * 20),
    bookmarks: Math.floor(Math.random() * 10),
  }));
  
  export const communities=Array.from({length:30},(_,i)=>({id:i+1,name :`Community ${i+1}`,members:Math.floor(Math.random()*50)}));
  // export const communities = [
  //   { id: 1, name: 'Community 1', members: 100 },
  //   { id: 2, name: 'Community 2', members: 200 },
  // ];

  export const notificationsData = [
    { id: 1, message: "New user signed up" },
    { id: 2, message: "Post reported for review" },
  ];