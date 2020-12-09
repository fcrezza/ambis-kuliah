export const posts = [
  {
    avatar: '/images/avatar1.png',
    name: 'Oscar Mingueza',
    title: 'Apa pendapat kalian tentang menteri kesehatan kita?',
    tags: ['Kesehatan', 'Umum', 'Politik'],
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    stats: {
      answer: 30,
      like: '650K'
    },
    timestamp: '10:03 AM, 2 Nov 2020'
  },
  {
    avatar: '/images/avatar2.png',
    name: 'Dominic Soboszalai',
    title: 'Saranin laptop yang bagus buat kuliah dong',
    tags: ['Teknologi', 'Umum'],
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    stats: {
      answer: 30,
      like: 650
    },
    timestamp: '10:03 AM, 2 Nov 2020'
  },
  {
    avatar: '/images/avatar3.png',
    name: 'Alejandro Balde',
    title: 'Unpopular opinion: Windows is sucks',
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    tags: ['Teknologi'],
    stats: {
      answer: 30,
      like: 65
    },
    timestamp: '10:03 AM, 2 Nov 2020'
  }
];

export const profiles = [
  {
    id: 1,
    avatar: '/images/avatar1.png',
    fullname: 'Oscar Mingueza',
    username: 'oscarmingueza',
    bio:
      'La masia pride! trying to be starting eleven and convince ronald trump'
  },
  {
    id: 2,
    avatar: '/images/avatar2.png',
    fullname: 'Dominic Soboszalai',
    bio: 'Kuliah pulang, kuliah pulang'
  },
  {
    id: 3,
    avatar: '/images/avatar3.png',
    fullname: 'Alejandro Balde',
    bio: 'Ordinary Person'
  }
];

export const comments = [
  {
    id: 1,
    profileID: 3,
    postID: 2,
    text: 'Budget ada berapa? kalo ada 8 juta lebih, mending rakit peci wkwkwk',
    timestamp: '10:03 AM, 2 Nov 2020',
    stats: {
      like: 300,
      answer: 0
    }
  }
];
