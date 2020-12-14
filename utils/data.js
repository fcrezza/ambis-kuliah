export const posts = [
  {
    id: 1,
    userID: 1,
    avatar: '/images/avatar1.png',
    name: 'Oscar Mingueza',
    title: 'Apa pendapat kalian tentang menteri kesehatan kita?',
    tags: ['Kesehatan', 'Umum', 'Politik'],
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    stats: {
      answer: 30,
      downvote: 30,
      upvote: 500
    },
    replyTo: null,
    timestamp: '10:03 AM, 2 Nov 2020'
  },
  {
    id: 2,
    userID: 2,
    avatar: '/images/avatar2.png',
    name: 'Dominic Soboszalai',
    title: 'Saranin laptop yang bagus buat kuliah dong',
    tags: ['Teknologi', 'Umum'],
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    stats: {
      answer: 30,
      downvote: 30,
      upvote: 650
    },
    replyTo: null,
    timestamp: '10:03 AM, 2 Nov 2020'
  },
  {
    id: 3,
    userID: 3,
    avatar: '/images/avatar3.png',
    name: 'Alejandro Balde',
    title: 'Unpopular opinion: Windows is sucks',
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    tags: ['Teknologi'],
    stats: {
      answer: 30,
      downvote: 30,
      upvote: 65
    },
    replyTo: null,
    timestamp: '10:03 AM, 2 Nov 2020'
  },
  {
    id: 4,
    userID: 3,
    title: null,
    text: 'Budget ada berapa? kalo ada 8 juta lebih, mending rakit peci wkwkwk',
    tags: null,
    stats: {
      downvote: 30,
      upvote: 300,
      answer: 0
    },
    replyTo: {
      userID: 2,
      postID: 2
    },
    timestamp: '10:03 AM, 2 Nov 2020'
  }
];

export const users = [
  {
    id: 1,
    avatar: '/images/avatar1.png',
    fullname: 'Oscar Mingueza',
    username: 'oscarmingueza',
    bio:
      'La masia pride! trying to be starting eleven and convince ronald trump',
    topics: ['Teknologi', 'Olahraga', 'Umum']
  },
  {
    id: 2,
    avatar: '/images/avatar2.png',
    fullname: 'Dominic Soboszalai',
    username: 'domsoboszalai',
    bio: 'Kuliah pulang, kuliah pulang',
    topics: ['Hukum', 'Umum']
  },
  {
    id: 3,
    avatar: '/images/avatar3.png',
    username: 'balde_alejandro',
    fullname: 'Alejandro Balde',
    bio: 'Ordinary Person',
    topics: ['Pendidikan', 'Umum']
  }
];

export const topics = [
  {name: 'Umum', image: '/images/general.png'},
  {name: 'Teknologi', image: '/images/technology.png'},
  {name: 'Agama', image: '/images/religion.png'},
  {name: 'Kesehatan', image: '/images/health.png'},
  {name: 'Ekonomi', image: '/images/economy.png'},
  {name: 'Pendidikan', image: '/images/education.png'}
];
