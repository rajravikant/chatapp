"use client";
import React, { useEffect, useState,useRef,ReactNode } from 'react';     
import { AnimatePresence,motion,useAnimation,useInView } from 'motion/react';    
import { v4 as uuidv4 } from 'uuid';            
import { 
  CircleChevronLeft,  
  Search,
  X, 
  Mail, 
  MapPin, 
  Link as LinkIcon, 
  Phone, 
  UserPlus, 
  Clock, 
  Shield ,
  CircleDashed,
  Check,
  Zap, 
  MessageSquare, 
  Users, 
  ArrowRight, 
} from 'lucide-react';  

const pageTransition = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

const generateRandomDate = ()=>{
  const start = new Date(2025, 0, 1); // Start date (January 1, 2010)
  const end = new Date(); // Current date
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate;
  }

  interface User {
    id: string;
    name: string;
    avatar: string;
    coverPhoto: string;
    status: 'online' | 'offline' | 'away' | 'busy';
    lastSeen?: Date;
    statusMessage?: string;
    location: string;
    timezone: string;
    email: string;
    phone: string;
    website: string;
    bio: string;
    joinDate: Date;
    groups?: Array<{ id: number; name: string; members: number }>;
    recentMedias ?: Array<{ id: number; media: string; time: string }>
  }
  
  interface Reaction {
    emoji: string;
    count: number;
    users: string[];
  }
  
  interface Message {
    id: string;
    text: string;
    sender: {
      id: string;
      name: string;
      avatar: string;
    };
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
    reactions: Reaction[];
    isStatusUpdate?: boolean;
  }
  
 
  
  
  const randomUsers =  [
    {
      "gender": "female",
      "name": {
        "title": "Ms",
        "first": "Saranya",
        "last": "Shetty"
      },
      "location": {
        "street": {
          "number": 6636,
          "name": "Sitabuldi Main Rd"
        },
        "city": "Rohtak",
        "state": "Manipur",
        "country": "India",
        "postcode": 21573,
        "coordinates": {
          "latitude": "-19.2281",
          "longitude": "98.3896"
        },
        "timezone": {
          "offset": "+5:45",
          "description": "Kathmandu"
        }
      },
      "email": "saranya.shetty@example.com",
      "login": {
        "uuid": "bedcaec9-2862-4115-b9a7-a64cd3c65a25",
        "username": "lazyostrich466",
        "password": "neon",
        "salt": "IyjggtnL",
        "md5": "889d8b3ec8ce3cd997eabfb95646c782",
        "sha1": "3b6d9e4ace1ffb411e262f628808e6dc9480cdea",
        "sha256": "c28b640e0a4de1050599fd9b6fe86c2a9b944f4f17304c0a9f72a23f6e30529a"
      },
      "dob": {
        "date": "1960-06-15T04:05:31.480Z",
        "age": 64
      },
      "registered": {
        "date": "2017-10-05T04:12:53.394Z",
        "age": 7
      },
      "phone": "7843613346",
      "cell": "7159065478",
      "id": {
        "name": "UIDAI",
        "value": "440722715310"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/82.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/82.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/82.jpg"
      },
      "nat": "IN"
    },
    {
      "gender": "female",
      "name": {
        "title": "Mrs",
        "first": "Shambhavi",
        "last": "Jain"
      },
      "location": {
        "street": {
          "number": 9349,
          "name": "Hazratganj"
        },
        "city": "Kollam",
        "state": "Kerala",
        "country": "India",
        "postcode": 28372,
        "coordinates": {
          "latitude": "-33.3536",
          "longitude": "-10.5091"
        },
        "timezone": {
          "offset": "+6:00",
          "description": "Almaty, Dhaka, Colombo"
        }
      },
      "email": "shambhavi.jain@example.com",
      "login": {
        "uuid": "a328f098-6cd6-470c-83b1-8520edb57ce5",
        "username": "whiteostrich662",
        "password": "1qaz2wsx",
        "salt": "LkQIUzzC",
        "md5": "c24df84ebaf750f3f8578e8a05079510",
        "sha1": "42c7966cf39f10859a107dbef5346ad8ef7deff2",
        "sha256": "4d8f89dfb8f427f5caa7ed4ec4c930799497972fe4dfd03c0f99ae25c1852d40"
      },
      "dob": {
        "date": "1979-04-24T11:29:15.926Z",
        "age": 46
      },
      "registered": {
        "date": "2010-07-31T18:17:36.154Z",
        "age": 14
      },
      "phone": "9507929391",
      "cell": "8676268582",
      "id": {
        "name": "UIDAI",
        "value": "634303849712"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/21.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/21.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/21.jpg"
      },
      "nat": "IN"
    },
    {
      "gender": "male",
      "name": {
        "title": "Mr",
        "first": "Ayush",
        "last": "Saldanha"
      },
      "location": {
        "street": {
          "number": 8428,
          "name": "Tank Bund Rd"
        },
        "city": "Maheshtala",
        "state": "Meghalaya",
        "country": "India",
        "postcode": 76133,
        "coordinates": {
          "latitude": "2.8135",
          "longitude": "-3.4332"
        },
        "timezone": {
          "offset": "-9:00",
          "description": "Alaska"
        }
      },
      "email": "ayush.saldanha@example.com",
      "login": {
        "uuid": "392a8c66-70eb-4a96-be90-ce4f6e17aba3",
        "username": "happyladybug497",
        "password": "4040",
        "salt": "neFzBs6Z",
        "md5": "b255386b32e819f457ab1d2f4f2dc74b",
        "sha1": "271d523eca258e8c2e9a654d09c1a0683b53a8e1",
        "sha256": "d21d315c35cb0c1223b3570cee8bd751895c51f0b5200b9e5cf106f7044c88b9"
      },
      "dob": {
        "date": "1973-10-06T05:13:13.511Z",
        "age": 51
      },
      "registered": {
        "date": "2012-12-11T02:22:58.626Z",
        "age": 12
      },
      "phone": "7387838723",
      "cell": "9772129502",
      "id": {
        "name": "UIDAI",
        "value": "930708188965"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/10.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/10.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/10.jpg"
      },
      "nat": "IN"
    },
    {
      "gender": "female",
      "name": {
        "title": "Ms",
        "first": "Neha",
        "last": "Nair"
      },
      "location": {
        "street": {
          "number": 5812,
          "name": "Tilak Marg"
        },
        "city": "Bhopal",
        "state": "Uttarakhand",
        "country": "India",
        "postcode": 33033,
        "coordinates": {
          "latitude": "22.6693",
          "longitude": "138.2481"
        },
        "timezone": {
          "offset": "-3:00",
          "description": "Brazil, Buenos Aires, Georgetown"
        }
      },
      "email": "neha.nair@example.com",
      "login": {
        "uuid": "8d3b5650-4e7f-4c24-a52c-1df9ab318664",
        "username": "brownelephant401",
        "password": "ficken",
        "salt": "3VoRdmM7",
        "md5": "375ecdeffb16d2cf226f0f34d21f7620",
        "sha1": "c4c904c6504f121de66c72174ff48d7ffaeab4d4",
        "sha256": "7294af269a24430230b96c006c397f42c153eaa6eb2f3e97fcbdb6e5d280bdf3"
      },
      "dob": {
        "date": "1969-02-19T04:11:49.872Z",
        "age": 56
      },
      "registered": {
        "date": "2013-09-18T03:35:02.008Z",
        "age": 11
      },
      "phone": "7177182822",
      "cell": "9865818481",
      "id": {
        "name": "UIDAI",
        "value": "181583094111"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/28.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/28.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/28.jpg"
      },
      "nat": "IN"
    },
    {
      "gender": "female",
      "name": {
        "title": "Mrs",
        "first": "Pratima",
        "last": "Almeida"
      },
      "location": {
        "street": {
          "number": 4598,
          "name": "Shakespeare Sarani"
        },
        "city": "Bardhaman",
        "state": "Nagaland",
        "country": "India",
        "postcode": 69859,
        "coordinates": {
          "latitude": "76.5864",
          "longitude": "116.9421"
        },
        "timezone": {
          "offset": "-3:30",
          "description": "Newfoundland"
        }
      },
      "email": "pratima.almeida@example.com",
      "login": {
        "uuid": "06778811-5dbd-45dc-85bb-b313e803f61c",
        "username": "organicwolf725",
        "password": "augusta",
        "salt": "oeBxRRDw",
        "md5": "25f962392fcb86ca836efe44d6979563",
        "sha1": "deade9cc99471b057f688b348178319f0143f92a",
        "sha256": "a79b854de0d57466a7160ed33545b1bd9ba9058d68d39e26d04c67acb34a85f0"
      },
      "dob": {
        "date": "1962-02-09T18:15:46.784Z",
        "age": 63
      },
      "registered": {
        "date": "2017-02-09T16:10:59.169Z",
        "age": 8
      },
      "phone": "8369353580",
      "cell": "7162951479",
      "id": {
        "name": "UIDAI",
        "value": "898112911183"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/88.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/88.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/88.jpg"
      },
      "nat": "IN"
    },
    {
      "gender": "female",
      "name": {
        "title": "Ms",
        "first": "Trupti",
        "last": "Shroff"
      },
      "location": {
        "street": {
          "number": 9563,
          "name": "Dadabhai Naoroji Rd"
        },
        "city": "Jorhat",
        "state": "Nagaland",
        "country": "India",
        "postcode": 37466,
        "coordinates": {
          "latitude": "-83.0890",
          "longitude": "116.6906"
        },
        "timezone": {
          "offset": "+3:30",
          "description": "Tehran"
        }
      },
      "email": "trupti.shroff@example.com",
      "login": {
        "uuid": "2edea8e9-79c5-49f2-b4ec-3b039f534569",
        "username": "angryswan767",
        "password": "spooky",
        "salt": "KBONIngQ",
        "md5": "6fce574618b07c6a8c9151713d32efa6",
        "sha1": "b3105a636f01bb0210f59fdfc141e9bc837e861b",
        "sha256": "f1e7b3c343a9c860342ff234b8887b59ac19178349844c5ec46cf86587a15de0"
      },
      "dob": {
        "date": "1999-10-13T00:20:13.240Z",
        "age": 25
      },
      "registered": {
        "date": "2003-09-05T13:18:59.435Z",
        "age": 21
      },
      "phone": "7543813639",
      "cell": "7392641655",
      "id": {
        "name": "UIDAI",
        "value": "213342690255"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/66.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/66.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/66.jpg"
      },
      "nat": "IN"
    },
    {
      "gender": "male",
      "name": {
        "title": "Mr",
        "first": "Vedant",
        "last": "Andrade"
      },
      "location": {
        "street": {
          "number": 719,
          "name": "Rasta Peth"
        },
        "city": "Imphal",
        "state": "Puducherry",
        "country": "India",
        "postcode": 96021,
        "coordinates": {
          "latitude": "-37.9292",
          "longitude": "-165.1525"
        },
        "timezone": {
          "offset": "-2:00",
          "description": "Mid-Atlantic"
        }
      },
      "email": "vedant.andrade@example.com",
      "login": {
        "uuid": "1bb2e4e4-3bda-49d1-97c2-2d28d60e7223",
        "username": "redkoala213",
        "password": "genius",
        "salt": "TyB8LyDf",
        "md5": "99cf46c476b7e45fea600f4c8cea01ac",
        "sha1": "29de3a24407605682238d67c143b75835c53f1d3",
        "sha256": "040fb0d5e80ce76a003929cd8163f6adab97c5f601c6874647f97c1017d1f2c4"
      },
      "dob": {
        "date": "1961-07-06T04:01:26.533Z",
        "age": 63
      },
      "registered": {
        "date": "2004-05-08T07:13:37.107Z",
        "age": 20
      },
      "phone": "7273057729",
      "cell": "9224767217",
      "id": {
        "name": "UIDAI",
        "value": "022407676192"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/71.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/71.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/71.jpg"
      },
      "nat": "IN"
    },
    {
      "gender": "male",
      "name": {
        "title": "Mr",
        "first": "Chandresh",
        "last": "Kaur"
      },
      "location": {
        "street": {
          "number": 7570,
          "name": "Chimanlal Girdharlal Rd"
        },
        "city": "Bhubaneswar",
        "state": "Jharkhand",
        "country": "India",
        "postcode": 58508,
        "coordinates": {
          "latitude": "-59.4425",
          "longitude": "91.4539"
        },
        "timezone": {
          "offset": "+5:45",
          "description": "Kathmandu"
        }
      },
      "email": "chandresh.kaur@example.com",
      "login": {
        "uuid": "80647d1b-a316-45bb-b519-fb4be74af594",
        "username": "whiteladybug331",
        "password": "dalshe",
        "salt": "TjNEfOQc",
        "md5": "c2529edb81426381b9244781073f8fc3",
        "sha1": "d97fc531c10bdabb4520878ac85a0eb4ebff13c0",
        "sha256": "b3321f8eab2dae8e959d3a9d93a6ae327927882b88e0ee4e74f389d22c5469b5"
      },
      "dob": {
        "date": "1978-07-14T19:10:46.455Z",
        "age": 46
      },
      "registered": {
        "date": "2014-01-17T04:46:16.690Z",
        "age": 11
      },
      "phone": "7329383430",
      "cell": "9054656280",
      "id": {
        "name": "UIDAI",
        "value": "350977816048"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/99.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/99.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/99.jpg"
      },
      "nat": "IN"
    },
    {
      "gender": "female",
      "name": {
        "title": "Mrs",
        "first": "Rathi",
        "last": "Prabhakaran"
      },
      "location": {
        "street": {
          "number": 1607,
          "name": "Dwaraka Nagar"
        },
        "city": "Bhilai",
        "state": "Punjab",
        "country": "India",
        "postcode": 62146,
        "coordinates": {
          "latitude": "6.5443",
          "longitude": "141.3466"
        },
        "timezone": {
          "offset": "+5:30",
          "description": "Bombay, Calcutta, Madras, New Delhi"
        }
      },
      "email": "rathi.prabhakaran@example.com",
      "login": {
        "uuid": "132a3e83-7bfd-4fd2-a4f2-22d49deec9f4",
        "username": "smallleopard344",
        "password": "noel",
        "salt": "jmwt2OeD",
        "md5": "b92af34c0e03c974524e6490d7799660",
        "sha1": "0697f2d7c694ebd649bae01d9c0cfaa18de2940c",
        "sha256": "5824119d49da32bb6aca08c82262ba5e38aa593f42153471510438778669a956"
      },
      "dob": {
        "date": "1982-12-16T00:00:47.154Z",
        "age": 42
      },
      "registered": {
        "date": "2015-07-23T15:33:40.152Z",
        "age": 9
      },
      "phone": "7688543273",
      "cell": "8053499219",
      "id": {
        "name": "UIDAI",
        "value": "509332409958"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/61.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/61.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/61.jpg"
      },
      "nat": "IN"
    },
    {
      "gender": "male",
      "name": {
        "title": "Mr",
        "first": "Tejas",
        "last": "Suvarna"
      },
      "location": {
        "street": {
          "number": 1112,
          "name": "Car St"
        },
        "city": "Rajahmundry",
        "state": "Jammu and Kashmir",
        "country": "India",
        "postcode": 32057,
        "coordinates": {
          "latitude": "-10.0080",
          "longitude": "73.9705"
        },
        "timezone": {
          "offset": "-4:00",
          "description": "Atlantic Time (Canada), Caracas, La Paz"
        }
      },
      "email": "tejas.suvarna@example.com",
      "login": {
        "uuid": "497aa831-ad0d-4bf1-a387-5d26b5f45e3a",
        "username": "angrygoose227",
        "password": "hayley",
        "salt": "fY45M4MU",
        "md5": "75441001460f6f9d0adf1c4a51a08e9b",
        "sha1": "5b2741359b0e6bcf982a50118f037119dfed94da",
        "sha256": "ca20d5f87d8137d0bf1a6712c0a4dcb5b6408e419b2fa4462b87154578628d84"
      },
      "dob": {
        "date": "1972-12-10T11:41:04.963Z",
        "age": 52
      },
      "registered": {
        "date": "2010-07-15T23:40:35.975Z",
        "age": 14
      },
      "phone": "8995976131",
      "cell": "7853610985",
      "id": {
        "name": "UIDAI",
        "value": "982863914984"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/47.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/47.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/47.jpg"
      },
      "nat": "IN"
    }
  ]
  
  const randomStatuses = [
  "The weather is great today!",
  "Just finished a great book!",
  "Feeling grateful for my friends and family.",
  "Excited for the weekend!",
  "Just had a delicious meal!",
  "Can't wait for the concert next week!",
  "Feeling inspired to start a new project.",
  "Just got back from a fun trip!",
  "Loving the new season of my favorite show.",
  "Feeling motivated to work out today!",
  "Just had a great conversation with a friend.",
  ]
  
  
  const randomBio = [
  "A computer science enthusiast with a passion for coding and technology. Currently exploring the world of web development and AI.",
  
  "An avid learner who enjoys tackling new challenges and building innovative solutions.",
  "A creative thinker with a knack for problem-solving. Always looking for ways to improve and optimize processes.",
  "A tech-savvy individual who loves to stay updated with the latest trends in technology and software development.",
  "A detail-oriented person who believes in the power of collaboration and teamwork. Enjoys working with others to achieve common goals.",
  "A lifelong learner who is always seeking new knowledge and skills. Passionate about personal and professional growth.",
  "A results-driven individual with a strong work ethic. Committed to delivering high-quality work and exceeding expectations.",
  "A passionate coder who enjoys building applications that solve real-world problems.",
  ]
  
  const randomMedias = [
  { id: 4243, media: 'https://randomwordgenerator.com/img/picture-generator/57e5d1414952a914f1dc8460962e33791c3ad6e04e5074417c2d78d39644c5_640.jpg', time: '2 hours ago' },
  { id: 4244, media: 'https://randomwordgenerator.com/img/picture-generator/55e1d4414e51aa14f1dc8460962e33791c3ad6e04e507749772f78d69f4acc_640.jpg', time: '2 hours ago' },
  { id: 4245, media: 'https://randomwordgenerator.com/img/picture-generator/57e3d04b4d57a414f1dc8460962e33791c3ad6e04e507440762a7cd6954cc2_640.jpg', time: '1 hour ago' },
  { id: 4246, media: 'https://randomwordgenerator.com/img/picture-generator/57e0d6424c5aa414f1dc8460962e33791c3ad6e04e507440762e7adc934cc7_640.jpg', time: '30 minutes ago' },
  { id: 4247, media: 'https://randomwordgenerator.com/img/picture-generator/53e0dd4a4b5aa414f1dc8460962e33791c3ad6e04e5074417d2c7ed7904ec5_640.jpg', time: '10 minutes ago' },
  
  
  { id: 4250, media: 'https://randomwordgenerator.com/img/picture-generator/52e0d242435ab10ff3d8992cc12c30771037dbf852547941742a78d59e4f_640.jpg', time: 'Just now' },
  ]
  
  const mockUsers: User[] = randomUsers.map((user,index) => ({
  id: `user-${index+1}`,
  name: `${user.name.first} ${user.name.last}`,
  avatar: user.picture.large,
  coverPhoto: user.picture.large,
  status: index % 4 === 0 ? 'online' : index % 4 === 1 ? 'offline' : index % 4 === 2 ? 'away' : 'busy',
  lastSeen: generateRandomDate(),
  bio : randomBio[Math.floor(Math.random() * randomBio.length)],
  statusMessage: randomStatuses[Math.floor(Math.random() * randomStatuses.length)],
  email : user.email,
  phone : user.phone,
  location : user.location.city,
  timezone : user.location.timezone.description,
  website : `https://${user.login.username}.com`,
  joinDate: new Date(user.registered.date),
  groups: [
    { id: 1, name: 'Friends', members: 10 },
    { id: 2, name: 'Family', members: 5 },
    { id: 3, name: 'Work', members: 20 },
  ],
  recentMedias: Math.random() > 0.5 ? randomMedias : [],
  }))
  
  

const initialConversations: Record<string, Message[]> = {
  'user-2': [
    {
      id: 'msg-1',
      text: 'Hi there! How are you doing today?',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
      status: 'read',
      reactions: []
    },
    {
      id: 'msg-2',
      text: "Hey bro how are yopu",
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 38 * 60 * 1000), // 38 minutes ago
      status: 'read',
      reactions: [
        { emoji: '👍', count: 1, users: ['user-2'] }
      ]
    },
    {
      id: 'msg-3',
      text: "I m good",
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
      status: 'read',
      reactions: []
    }
  ],
  'user-3': [
    {
      id: 'msg-4',
      text: 'Hey, did you get a chance to look at the design mockups I sent over?',
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'read',
      reactions: []
    },
    {
      id: 'msg-5',
      text: 'In a meeting',
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      status: 'delivered',
      reactions: [],
      isStatusUpdate: true
    }
  ],
  'user-4': [],
  'user-5': [
    {
      id: 'msg-6',
      text: 'Do not disturb',
      sender: mockUsers[4],
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      status: 'delivered',
      reactions: [],
      isStatusUpdate: true
    }
  ],
  'user-6': [
    {
      id: 'msg-7',
      text: 'Can we schedule a call tomorrow to discuss the client presentation?',
      sender: mockUsers[5],
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: 'read',
      reactions: []
    },
    {
      id: 'msg-8',
      text: 'Yes, Im available after 2pm. Would 3pm work for you?',
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000), // 1 day ago + 10 minutes
      status: 'read',
      reactions: []
    }
  ]
};



const Page = () => {
  const [currentView, setCurrentView] = useState<"landing" | "chat" | null>(null);

  useEffect(()=>{
      setCurrentView("landing")
  },[])

  

  return (
    <div className="min-h-screen ">
    
     <AnimatePresence
      initial={false}
      mode="wait"
     >
      <motion.div 
        key={currentView}
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className='h-full w-full'
      >
      {currentView === "landing" && <ChatAppLanding setView={() => setCurrentView("chat")} />}
      {currentView === "chat" && <ChatPage setView={() => setCurrentView("landing")} />}
      </motion.div>
     </AnimatePresence>
    </div>
  );
};

export default Page;


const landingPageData = {
  techCompanyLogos : [
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",     
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",            
    "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Samsung_Black_icon.svg/500px-Samsung_Black_icon.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/FoxconnLogo-special.svg/375px-FoxconnLogo-special.svg.png",      
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/330px-Meta_Platforms_Inc._logo.svg.png"         
  ],
  features : [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "End-to-End Encryption",
      description: "Your conversations are protected with industry-leading encryption, ensuring your data stays private.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Real-time Messaging",
      description: "Experience lightning-fast message delivery with instant notifications across all your devices.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Team Collaboration",
      description: "Create channels, share files, and organize your team's communication efficiently.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "File Sharing",
      description: "Share documents, images, and videos with powerful cloud storage integration.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Cross-Platform",
      description: "Access your chats from any device with native applications for iOS, Android, Mac, and Windows.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Customizable",
      description: "Personalize your experience with themes, notification settings, and workflow integrations.",
    },
  ],
  testimonials : [
    {
      content: "ChatFlow has completely transformed how our team communicates. The interface is intuitive and the features are exactly what we needed.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      avatar: "https://randomuser.me/api/portraits/women/75.jpg"
    },
    {
      content: "I've tried many chat applications, but ChatFlow stands out with its speed and reliability. The encryption gives me peace of mind when sharing sensitive information.",
      author: "Michael Chen",
      role: "CTO at StartupX",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      content: "The cross-platform functionality is seamless. I can start a conversation on my phone and continue on my laptop without missing a beat.",
      author: "Emma Rodriguez",
      role: "Digital Nomad",
      avatar: "https://randomuser.me/api/portraits/women/78.jpg"
    },
  ],
  faqs : [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial available?",
      answer: "We offer a 14-day free trial on our Pro plan so you can experience all the premium features before committing."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and for annual enterprise plans, we can accommodate bank transfers."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription anytime from your account settings. You'll continue to have access until the end of your billing period."
    }
  ],

}


const ChatAppLanding: React.FC<{ setView: () => void }> = ({setView}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  
  const LandingHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 300);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    

    
    return (
    <motion.header 
    className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <motion.div
            
            className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ChatFlow</span>
        </div>
        
       
        
        <div className="hidden md:flex items-center space-x-4">
           
        <nav className="hidden md:flex gap-5 mr-8">
          <a href="#features" className="text-base  text-gray-800 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#testimonials" className="text-base  text-gray-800 hover:text-indigo-600 transition-colors">Testimonials</a>
          <a href="#pricing" className="text-base  text-gray-800 hover:text-indigo-600 transition-colors">Pricing</a>
        </nav>
          <motion.button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick = {setView}
          >
            Demo
          </motion.button>
        </div>
        
       
        <div className="md:hidden">
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
    
            
  <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-white rounded-lg shadow-lg p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="#features" onClick={() => setIsMenuOpen(false)}>Features</MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</MobileNavLink>
            <MobileNavLink href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</MobileNavLink>
            <MobileNavLink href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</MobileNavLink>
            <motion.button
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors w-full"
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>


  </motion.header> 
  )
  }





  const HeroSection = ()=>(
    <section className="relative pt-24 pb-16 w-full overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 z-0"></div>
        
        <AnimatedBackground/>
        
        <div className="max-w-7xl mx-auto px-4 h-full sm:px-6 lg:px-8 relative z-10">
          <div className="flex lg:flex-row flex-col justify-between w-full h-full items-center">
            <div className="sm:text-center lg:w-1/2 lg:text-left lg:flex lg:flex-col lg:justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl font-semibold  sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl ">
                  <span className="block text-gray-800">Connect Instantly,</span>
                  <span className="block mt-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Chat Securely
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 lg:text-lg">
                  Experience the next generation of secure messaging. ChatFlowBox brings people together with real-time, encrypted chats across all your devices.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.button onClick={setView}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Chat Now
              </motion.button>
              
            </motion.div>
                </div>
              </motion.div>
            </div>
            <div className="mt-12 relative lg:mt-0 lg:flex lg:items-center">
              <motion.div 
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-8 w-full flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">A</div>
                    <div className="ml-4">
                      <div className="font-medium">Alice</div>
                      <div className="text-xs text-gray-500">Online</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-xs mb-2">
                      <p className="text-gray-700 text-sm">Hey Bob! Have you checked out the new ChatFlow app?</p>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-indigo-100 p-3 rounded-lg rounded-tr-none max-w-xs">
                        <p className="text-indigo-800 text-sm">Yes! The UI is amazing and its so fast!</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-xs mb-2">
                      <p className="text-gray-700 text-sm">I love how easy it is to create group chats and share files.</p>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-indigo-100 p-3 rounded-lg rounded-tr-none max-w-xs">
                        <p className="text-indigo-800 text-sm">And the encryption is top-notch! Perfect for work.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 rounded-lg p-2">
                    <input type="text" placeholder="Type a message..." className="bg-transparent flex-1 outline-none text-gray-700" />
                    <button className="ml-2 text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>



              
            </div>
          </div>
        </div>
      </section>
  )

  
function TrustedBySection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });


  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation for the heading and subheading
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6 
      }
    }
  };

 

  return (
    <section className="bg-white py-2">
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
      className="my-16 relative overflow-hidden"
    >
      {/* Heading */}
      <motion.div 
        variants={textVariants}
        className="text-center mb-8"
      >
        <h3 className="text-xl xl:text-2xl font-semibold text-gray-700">Our Clients</h3>
        <p className="text-gray-500 mt-2">Join thousands of teams already using our platform</p>
      </motion.div>

      {/* Logo carousel with continuous animation */}
      <div className="relative max-w-7xl mx-auto mb-8 overflow-hidden">
        {/* Gradient fade effect on edges */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        {/* Moving spotlight effect */}
        

        {/* First moving logo track */}
        <motion.div
          className="flex items-center space-x-12 py-6"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate the logos array to ensure continuous looping */}
          {[...landingPageData.techCompanyLogos, ...landingPageData.techCompanyLogos].map((company, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 w-40 h-16`}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <picture>
                <img src={company} className='h-full w-full object-contain' alt={company.slice(100,10)} />
                </picture>


              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Second moving logo track (opposite direction) */}
        <motion.div
          className="flex items-center space-x-12 py-6"
          animate={{
            x: [-2000, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {/* Reverse and duplicate the logos array */}
          {[...landingPageData.techCompanyLogos.reverse(), ...landingPageData.techCompanyLogos].map((company, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100
              w-40 h-16`}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <picture>
                    <img src={company} className='h-full w-full object-contain' alt='company-logo' />
                </picture>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="flex justify-center">
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-60"></div>
      </div>
    </motion.div>
    </section>
  );
}



function Features() {
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-xl xl:text-2xl font-semibold mb-4 text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            className="text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to stay connected and productive
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {landingPageData.features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <CTASection2/>
        
       
      </div>
    </section>
  );
}


function CTASection2() {
  return (
    <motion.div 
    className="mt-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-xl"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7 }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="p-8 md:p-12 flex items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Advanced AI Assistant</h3>
          <p className="text-indigo-100 mb-6">Our intelligent assistant helps you stay organized, summarizes conversations, and enables smart replies.</p>
          <motion.button
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </div>
      <div className="bg-indigo-800 bg-opacity-50 p-8 md:p-12 flex items-center justify-center">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full max-w-sm">
          <div className="p-5">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="font-medium">AI Assistant</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                <p className="text-gray-700">Here &apos; is a summary of your meeting</p>
                <ul className="text-gray-600 text-sm mt-2 list-disc list-inside">
                  <li>Project deadline moved to Friday</li>
                  <li>Budget approved for new tools</li>
                  <li>Sarah will join the design team</li>
                </ul>
              </div>
            </div>
            <div className="mb-4">
              <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                <p className="text-gray-700">Would you like me to set reminders for these items?</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Yes, please</button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">No thanks</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  )
} 


function Testimonials() {
 

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="md:text-4xl text-xl xl:text-2xl font-semibold mb-4 text-gray-700">What Our Users Say</h2>
          <p className=" text-gray-500 max-w-2xl mx-auto">
            Join thousands of satisfied users who &apos; ve improved their communication with ChatFlow
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {landingPageData.testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-4 text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-6 italic">{testimonial.content}</p>
              <div className="flex items-center">
                <picture>
                <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full" />

                </picture>
                <div className="ml-4">
                  <h4 className="font-medium text-sm">{testimonial.author}</h4>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-2xl font-medium text-gray-700 mb-8">4.9/5 average rating across 10,000+ reviews</p>
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-700">App Store</span>
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-700">Google Play</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


function MobileNavLink({ href, onClick, children }:any) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="text-gray-700 hover:text-indigo-600 font-medium transition-colors block w-full text-center py-2"
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}





// Main pricing component
function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('annually');
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <div id='pricing' className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header Section */}
        <HeaderSection />

        {/* Billing Toggle */}
        <BillingToggle 
          billingCycle={billingCycle} 
          setBillingCycle={setBillingCycle} 
        />

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 ">
          <PricingTier
            tier="Basic"
            description="Perfect for individuals and small projects"
            price={billingCycle === 'annually' ? '5' : '7'}
            features={[
              'Up to 1,000 messages per month',
              'Basic chat features',
              '1 team member',
              'Email support',
              '5 chat rooms'
            ]}
            notIncluded={[
              'Advanced analytics',
              'Custom branding',
              'API access'
            ]}
            icon={<MessageSquare />}
            popular={false}
            setHoveredTier={setHoveredTier}
            hoveredTier={hoveredTier}
          />

          <PricingTier
            tier="Pro"
            description="Ideal for growing teams and businesses"
            price={billingCycle === 'annually' ? '15' : '19'}
            features={[
              'Up to 10,000 messages per month',
              'Advanced chat features',
              'Up to 10 team members',
              'Priority support',
              'Unlimited chat rooms',
              'Basic analytics',
              'Custom branding'
            ]}
            notIncluded={[
              'API access'
            ]}
            icon={<Users />}
            popular={true}
            setHoveredTier={setHoveredTier}
            hoveredTier={hoveredTier}
          />

          <PricingTier
            tier="Enterprise"
            description="For organizations with advanced needs"
            price={billingCycle === 'annually' ? '29' : '39'}
            features={[
              'Unlimited messages',
              'Premium chat features',
              'Unlimited team members',
              '24/7 dedicated support',
              'Unlimited chat rooms',
              'Advanced analytics',
              'Custom branding',
              'API access',
              'SSO integration',
              'Compliance features'
            ]}
            icon={<Shield />}
            popular={false}
            setHoveredTier={setHoveredTier}
            hoveredTier={hoveredTier}
          />
        </div>

        <FAQSection/>

       
      </div>
    </div>
  );
}

// Header component for pricing
function HeaderSection() {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="inline-block mb-4"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full inline-block">
          <MessageSquare className="size-6 text-white" />
        </div>
      </motion.div>
      <motion.h2 
        className="md:text-4xl text-xl xl:text-2xl font-semibold mb-4 text-gray-700 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Choose Your Perfect Plan
      </motion.h2>
      <motion.p 
        className="text-gray-500  max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Find the right features for your team at a price that works for your budget
      </motion.p>
    </motion.div>
  );
}

// Billing toggle component
function BillingToggle({ billingCycle, setBillingCycle }:{billingCycle:string, setBillingCycle: (bill : string)=>void}) {
  return (
    <motion.div 
      className="flex justify-center mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="bg-gray-100 p-1 rounded-full flex items-center shadow-sm">
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium ${
            billingCycle === 'monthly' 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-500'
          }`}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium flex items-center ${
            billingCycle === 'annually' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-gray-500'
          }`}
          onClick={() => setBillingCycle('annually')}
        >
          Annually <span className="ml-2 text-xs py-1 px-2 rounded-full">Save 20%</span>
        </button>
      </div>
    </motion.div>
  );
}





interface PricingTierProps {
  tier: string; 
  description: string; 
  price: string; 
  features: string[]; 
  notIncluded?: string[]; 
  icon: ReactNode; 
  popular?: boolean; 
  setHoveredTier: (tier: string | null) => void; 
  hoveredTier: string | null; 
}

// Pricing tier component
function PricingTier({ 
  tier, 
  description, 
  price, 
  features, 
  notIncluded = [], 
  icon, 
  popular, 
  setHoveredTier,
  hoveredTier
}:PricingTierProps) {
  const isHovered = hoveredTier === tier;
  const variants = {
    default: { scale: 1 },
    hover: { scale: 1.03 }
  };

  return (
    <motion.div
      className={`rounded-2xl overflow-hidden relative ${
        popular 
          ? 'bg-white border-2 border-blue-500 shadow-xl' 
          : 'bg-white border border-gray-200 shadow-lg'
      }`}
      variants={variants}
      animate={isHovered ? 'hover' : 'default'}
      onMouseEnter={() => setHoveredTier(tier)}
      onMouseLeave={() => setHoveredTier(null)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 20, delay: tier === 'Basic' ? 0.1 : tier === 'Pro' ? 0.2 : 0.3 }}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
            MOST POPULAR
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
          popular ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
        }`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-1 text-gray-900">{tier}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500 ml-1">/mo per user</span>
        </div>
        
        <motion.button
          className={`w-full py-3 px-4 rounded-lg font-medium mb-6 flex items-center justify-center transition-colors ${
            popular 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {popular ? 'Start free trial' : 'Get started'} 
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.button>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className={`mr-3 mt-1 ${popular ? 'text-blue-600' : 'text-green-500'}`}>
                <Check className="h-4 w-4" />
              </div>
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
          
          {notIncluded.map((feature, index) => (
            <div key={index} className="flex items-start opacity-60">
              <div className="mr-3 mt-1 text-gray-400">
                <X className="h-4 w-4" />
              </div>
              <span className="text-sm text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// FAQ section component
function FAQSection() {
  
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  return (
    <motion.div 
      className="mt-24 mb-16 h-full" id='faq'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">Frequently Asked Questions</h3>
      
      <div className="space-y-4">
        {landingPageData.faqs.map((faq, index) => (
          <motion.div 
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <motion.div
                animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-blue-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: expandedFaq === index ? 'auto' : 0,
                opacity: expandedFaq === index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 text-gray-600 text-sm">
                {faq.answer}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


// CTA section component
function CTASection({setView}:{setView: (view: string) => void}) {
  return (
    <section className=' py-20 w-full h-full bg-white'>
    <motion.div 
      className="px-4 max-w-7xl mx-auto  lg:px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-8 md:py-12 text-center shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <motion.h3 
        className="text-2xl md:text-3xl font-bold mb-4 text-white"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Ready to revolutionize your team communication?
      </motion.h3>
      
      <motion.p 
        className="text-blue-100 mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Join thousands of teams who have already transformed how they collaborate and communicate.
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium flex items-center justify-center w-full sm:w-auto shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={()=> setView('chat')}
        >
          Try Now <Zap className="ml-2 h-4 w-4" />
        </motion.button>
        
       
      </motion.div>
    </motion.div>
    </section>
  );
}


 

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <LandingHeader/>
      <HeroSection/>
      <TrustedBySection/>
      <Features/>
      <Testimonials/>
      <PricingSection/>
      <CTASection setView={setView} />
      <Footer/>
    </div>
    ); 
}



// ChatPage Component

const ChatPage: React.FC<{setView : ()=>void}> = ({setView}) => {
  const [currentUser] = useState<User>(mockUsers[0]); // Current user is the first user
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [conversations, setConversations] = useState<Record<string, Message[]>>(initialConversations);
  const [typingStatus, setTypingStatus] = useState<Record<string, boolean>>({});
  
 

  // Get selected user object
  const selectedUser = selectedUserId ? users.find(user => user.id === selectedUserId) : null;
  
  // Get current conversation
  const currentConversation = selectedUserId ? conversations[selectedUserId] || [] : [];
  
  // Handle user selection
  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    
    // Mark messages as read when selecting a user
    if (userId in conversations) {
      const updatedConversation = conversations[userId].map(msg => {
        if (msg.sender.id !== currentUser.id && msg.status !== 'read') {
          return { ...msg, status: 'read' };
        }
        return msg;
      });
      
      // @ts-expect-error
      setConversations({
        ...conversations,
        [userId]: updatedConversation
      });
    }
  };
  
  // Handle sending a message
  const handleSendMessage = (text: string) => {
    if (!selectedUserId) return;
    
    const newMessage: Message = {
      id: uuidv4(),
      text,
      sender: currentUser,
      timestamp: new Date(),
      status: 'sent',
      reactions: []
    };
    
    // Update conversations
    setConversations(prev => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newMessage]
    }));
    
    // Simulate message delivery after a short delay
    setTimeout(() => {
      // @ts-expect-error
      setConversations((prev) => {
        const updatedMessages = prev[selectedUserId].map(msg => {
          if (msg.id === newMessage.id) {
            return { ...msg, status: 'delivered' };
          }
          return msg;
        });
        
        return {
          ...prev,
          [selectedUserId]: updatedMessages
        };
      });
      
      // Simulate message read after another delay
      setTimeout(() => {
        // @ts-expect-error
        setConversations(prev => {
          const updatedMessages = prev[selectedUserId].map(msg => {
            if (msg.id === newMessage.id) {
              return { ...msg, status: 'read' };
            }
            return msg;
          });
          
          return {
            ...prev,
            [selectedUserId]: updatedMessages
          };
        });
      }, 1500);
      
      // Simulate reply from user after a delay (for certain users)
      if (['user-2', 'user-4','user-5','user-7'].includes(selectedUserId) && Math.random() > 0.5) {
        simulateTyping(selectedUserId);
        
        const responseTime = 3000 + Math.random() * 5000;
        setTimeout(() => {
          const selectedUserObj = users.find(u => u.id === selectedUserId);
          if (selectedUserObj) {
            const responseMessages = [
              "That sounds great!",
              "Thanks for letting me know.",
              "I'll get back to you on that soon.",
              "Perfect, let's proceed with that.",
              "Got it, thanks!",
              "I understand. Let me think about it."
            ];
            
            const replyMessage: Message = {
              id: uuidv4(),
              text: responseMessages[Math.floor(Math.random() * responseMessages.length)],
              sender: selectedUserObj,
              timestamp: new Date(),
              status: 'delivered',
              reactions: []
            };
            
            setConversations(prev => ({
              ...prev,
              [selectedUserId]: [...prev[selectedUserId], replyMessage]
            }));
            
            setTypingStatus(prev => ({
              ...prev,
              [selectedUserId]: false
            }));
          }
        }, responseTime);
      }
    }, 1000);
  };
  
  // Handle message reactions
  const handleReactToMessage = (messageId: string, emoji: string) => {
    if (!selectedUserId) return;
    
    setConversations(prev => {
      const updatedMessages = prev[selectedUserId].map(msg => {
        if (msg.id === messageId) {
          // Check if this reaction already exists
          const existingReactionIndex = msg.reactions.findIndex(r => r.emoji === emoji);
          
          if (existingReactionIndex >= 0) {
            // Update existing reaction
            const updatedReactions = [...msg.reactions];
            const reaction = updatedReactions[existingReactionIndex];
            
            // Check if user already reacted
            const userIndex = reaction.users.indexOf(currentUser.id);
            
            if (userIndex >= 0) {
              // Remove user's reaction if they already reacted with this emoji
              if (reaction.count === 1) {
                // Remove the whole reaction if this is the last user
                updatedReactions.splice(existingReactionIndex, 1);
              } else {
                // Just remove the user
                reaction.users.splice(userIndex, 1);
                reaction.count--;
              }
            } else {
              // Add user's reaction
              reaction.users.push(currentUser.id);
              reaction.count++;
            }
            
            return { ...msg, reactions: updatedReactions };
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [
                ...msg.reactions,
                { emoji, count: 1, users: [currentUser.id] }
              ]
            };
          }
        }
        return msg;
      });
      
      return {
        ...prev,
        [selectedUserId]: updatedMessages
      };
    });
  };
  
  // Simulate typing
  const simulateTyping = (userId: string) => {
    setTypingStatus(prev => ({
      ...prev,
      [userId]: true
    }));
  };
  
  // Handle typing start
  const handleStartTyping = () => {
    if (!selectedUserId) return;
    
    // Simulate other user start typing after a delay (for certain users)
    if (['user-2', 'user-4'].includes(selectedUserId) && Math.random() > 0.7) {
      setTimeout(() => {
        simulateTyping(selectedUserId);
        
        // Stop typing after a random period
        setTimeout(() => {
          setTypingStatus(prev => ({
            ...prev,
            [selectedUserId]: false
          }));
        }, 2000 + Math.random() * 3000);
      }, 1000 + Math.random() * 2000);
    }
  };
  
  // Handle typing stop
  const handleStopTyping = () => {
    // This is just for the current user, handled in the MessageInput component
  };
  
  // Handle status update
  const handleStatusUpdate = (text: string) => {
    if (!selectedUserId) return;
    
    const newStatusMessage: Message = {
      id: uuidv4(),
      text,
      sender: currentUser,
      timestamp: new Date(),
      status: 'sent',
      reactions: [],
      isStatusUpdate: true
    };
    
    // Update conversations
    setConversations(prev => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newStatusMessage]
    }));
    
    // Update current user status message
    setUsers(prev => prev.map(user => {
      if (user.id === currentUser.id) {
        return { ...user, statusMessage: text };
      }
      return user;
    }));
  };

 


  
  return (
    <>
    <div className="flex h-screen overflow-hidden bg-purple-50 w-full relative font-sans">
      <AnimatedBackground numbers={15}/>
      <div className="w-full max-w-screen-2xl flex m-10 relative">
        {/* Sidebar with users list */}
        <div className="lg:w-78 border-r">
          <UsersList 
            users={users}
            currentUserId={currentUser.id}
            onUserSelect={handleSelectUser}
            selectedUserId={selectedUserId}
            setView={setView}
            onSendStatusUpdate={handleStatusUpdate}
          />
        </div>
        
        {/* Main chat area */}
        <div className="flex-1 lg:flex hidden flex-col h-full">
          <ChatArea 
            messages={currentConversation}
            currentUserId={currentUser.id}
            isTyping={!!selectedUserId && typingStatus[selectedUserId]}
            typingUser={selectedUser!}
            selectedUser={selectedUser!}
            onReactToMessage={handleReactToMessage}
          />
          
          {selectedUserId && (
            <MessageInput 
              onSendMessage={handleSendMessage}
              onStartTyping={handleStartTyping}
              onStopTyping={handleStopTyping}
            />
          )}
        </div>

          

      </div>
    </div>
    </>
  );
};



// Users list component
interface UsersListProps {
  users: User[];
  currentUserId: string;
  onUserSelect: (userId: string) => void;
  selectedUserId?: string;
  setView: () => void;
  onSendStatusUpdate: (text: string) => void;

}

const UsersList: React.FC<UsersListProps> = ({ 
  users, 
  currentUserId, 
  onUserSelect,
  selectedUserId,
  setView,
  onSendStatusUpdate
}) => {
  const [filter, setFilter] = useState<'all' | 'online'>('all');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>();

  useEffect(()=>{
    const filteredUsers = filter === 'all' 
    ? users
    : users.filter(user => user.status === 'online');
    setFilteredUsers(filteredUsers);
  },[filter, users])

  const currentUser = users.find(user => user.id === currentUserId);
  
  const getLastSeenText = (user: User) => {
    if (user.status === 'online') return 'Active now';
    if (!user.lastSeen) return 'Offline';
    
    const now = new Date();
    const lastSeen = new Date(user.lastSeen);
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return diffDays === 1 ? 'Yesterday' : `${diffDays}d ago`;
  };


  const handleStatusUpdate = (text: string) => {
    onSendStatusUpdate(text);
  };

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) || user.statusMessage?.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
    
  }

 

  const UserDropDown = () => {
    return (
      <div className="relative">
                    <button
                      className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      aria-label="User menu"
                      aria-expanded={isProfileMenuOpen}
                    >
                      {/* <span className="hidden sm:block text-sm font-medium text-gray-700">{currentUser?.name}</span> */}
                      <Avatar 
                        src={currentUser?.avatar || ''} 
                        alt={currentUser?.name || ""}
                        size="md"
                      />
                    </button>
                    
                    <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-300 z-50"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <div className="py-1">
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            onClick={()=> {
                              setIsProfileMenuOpen(false);
                              setIsSettingsOpen(true);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            onClick={()=> alert("Logging out")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </div>
    )
  }



  return (
    <div className="bg-white rounded-l-lg shadow-sm h-full flex flex-col border-l">
       <SettingsModal currentUser={currentUser!}  isOpen={isSettingsOpen}  onClose={() => setIsSettingsOpen(false)} onUpdateUser={(user)=>console.log(user)}/>

      <div className="p-4 border-b">
        <div className='flex justify-between items-center'>
        <UserDropDown />
        <div className="flex items-center relative">
      <button onClick={setView} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 focus:outline-none" aria-label="Back to landing page" title="Back to landing page">
              
      <CircleChevronLeft size={20} />
      </button>
      <StatusUpdatePicker onSelectStatus={handleStatusUpdate} />

        </div>
        </div>
        <div className="flex mt-3 bg-gray-100 rounded-md p-1">
          <button
            className={`flex-1 py-1 px-3 rounded-md text-sm font-medium transition ${
              filter === 'all' ? 'bg-white shadow-sm text-gray-500' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`flex-1 py-1 px-3 rounded-md text-sm font-medium transition ${
              filter === 'online' ? 'bg-white shadow-sm text-gray-500' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setFilter('online')}
          >
            Online
          </button>
        </div>
      </div>
      
      <div className="p-2 flex-1 overflow-y-auto">

            <div className="relative">
            <input
              type="text"
              className="w-full py-1.5 ps-10 pr-1  text-sm border rounded-md mb-2 outline-none "
              onChange={handleUserSearch}
            />
            <span className="absolute top-2 left-2 text-gray-400/75">
            <Search size={18} />
            </span>

            </div>
        {filteredUsers?.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500 text-sm">
            No {filter === 'online' ? 'online ' : ''}users found
          </div>
        ) : (
          <ul className="space-y-1">
            {filteredUsers?.map((user) => (
              <li 
                key={user.id}
              >
                <button
                  className={`w-full text-left p-2 cursor-pointer rounded-md transition ${
                    selectedUserId === user.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => onUserSelect(user.id)}
                >
                  <div className="flex items-center">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      status={user.status}
                      className="mr-3"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-800 font-medium truncate">
                          {user.id === currentUserId ? `(You)` : user.name}
                        </p>
                        <span className="text-xs text-gray-500">{getLastSeenText(user)}</span>
                      </div>
                      {user.statusMessage && (
                        <p className="text-xs text-gray-500 truncate">{user.statusMessage}</p>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


// =======Chat Message=============

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  reactions: Reaction[];
  isStatusUpdate?: boolean;
}

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
  onReact: (messageId: string, emoji: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isOwnMessage,
  onReact
}) => {
  const [showReactions, setShowReactions] = useState(false);
  
  
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const messageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const statusIndicator = () => {
    switch (message.status) {
      case 'sent':
        return <span className="text-gray-500">✓</span>;
      case 'delivered':
        return <span className="text-gray-500">✓✓</span>;
      case 'read':
        return <span className="text-blue-500">✓✓</span>;
      default:
        return null;
    }
  };

  // Status update messages have a special styling
  if (message.isStatusUpdate) {
    return (
      <motion.div 
        className="flex justify-center my-2"
        variants={messageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <span className="px-4 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
          {message.text}
        </span>
      </motion.div>
    );
  }

  const emojiOptions = ['👍', '❤️', '😂', '😮', '😢', '👏'];

  return (
    <motion.div 
      className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
      variants={messageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      
      
      <div className={`flex flex-col max-w-xs sm:max-w-md`}>
        
        
        <div 
          className={`relative px-4 py-2 rounded-2xl ${
            isOwnMessage 
              ? 'bg-indigo-600 text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          <p className="text-sm sm:text-base">{message.text}</p>
          
          {showReactions && (
            <div className="absolute bottom-0 left-0 transform translate-y-full mt-1 z-10">
              <motion.div 
                className="flex bg-white rounded-full shadow-lg p-1 mt-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {emojiOptions.map(emoji => (
                  <button
                    key={emoji}
                    className="p-1 hover:bg-gray-100 rounded-full"
                    onClick={() => onReact(message.id, emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </motion.div>
            </div>
          )}
          
          <div className="flex items-center justify-end mt-1">
            <span className="text-xs opacity-70 mr-1">{formattedTime}</span>
            {isOwnMessage && statusIndicator()}
          </div>
        </div>
        
        {message.reactions.length > 0 && (
          <div className="flex mt-1 ml-1">
            {message.reactions.map((reaction, index) => (
              <div 
                key={index} 
                className="flex items-center bg-white rounded-full py-0.5 px-2 mr-1 text-sm border shadow-sm"
              >
                <span>{reaction.emoji}</span>
                <span className="ml-1 text-xs text-gray-600">{reaction.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      
    </motion.div>
  );
};

// =======Chat Message=============




// ========Chat Area Component =========


interface ChatAreaProps {
  messages: Message[];
  currentUserId: string;
  isTyping: boolean;
  typingUser: User | null;
  selectedUser: User | null;
  onReactToMessage: (messageId: string, emoji: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  currentUserId,
  isTyping,
  typingUser,
  selectedUser,
  onReactToMessage,

}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showUserProfile, setShowUserProfile] = React.useState(false);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProfileClose = () => {
    setShowUserProfile(false);
  }
  const handleProfileOpen = () => {
    setShowUserProfile(true);
  }

  return (
    <div className="flex flex-col h-full border-r rounded-tr-lg overflow-hidden">
      
      <UserProfileModal isOpen={showUserProfile} onClose={handleProfileClose} userData={selectedUser!} />
      {selectedUser ? (
        <>
          <div className="border-b p-3 flex items-center bg-white">
            <div className="flex-1">
              <div className='inline-flex items-center cursor-pointer ' onClick={handleProfileOpen}>
                <Avatar
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      status={selectedUser.status}
                      className="mr-3"
                    />
                    <div>
              <h2 className="font-medium text-gray-800">{selectedUser.name}</h2>
              <p className="text-xs text-gray-500">
                {selectedUser.status === 'online' ? 'Active now' : 'Offline'}
                {selectedUser.statusMessage && ` • ${selectedUser.statusMessage}`}
              </p>

                    </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                className="p-2 rounded-full hover:bg-gray-100" 
                title="Voice call"
                aria-label="Voice call"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100" 
                title="Video call"
                aria-label="Video call"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100" 
                title="More options"
                aria-label="More options"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
            </div>
          </div>
        
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-center">
                  No messages yet. <br />
                  Send your first message to {selectedUser.name}!
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map(message => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isOwnMessage={message.sender.id === currentUserId}
                    onReact={onReactToMessage}
                  />
                ))}
                
                {isTyping && typingUser && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TypingIndicator user={typingUser} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-xl font-medium mb-2">No chat selected</h3>
          <p className="text-center max-w-md">
            Select a contact from the list to start a conversation.
          </p>
        </div>
      )}
    </div>
  );
};


// ========Chat Area Component =========





// Settings Modal
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUpdateUser: (updatedUser: Partial<User>) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy'>('profile');
  const [name, setName] = useState(currentUser.name);
  const [statusMessage, setStatusMessage] = useState(currentUser.statusMessage || '');
  const [status, setStatus] = useState(currentUser.status);
  const [notificationSettings, setNotificationSettings] = useState({
    newMessage: true,
    friendRequest: true,
    soundEffects: true,
    desktopNotifications: false,
    emailNotifications: false
  });
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showReadReceipts: true,
    allowFriendRequests: 'everyone', // 'everyone', 'friends-of-friends', 'nobody'
    whoCanSeeLastSeen: 'everyone', // 'everyone', 'contacts', 'nobody'
    blockList: [mockUsers[2],mockUsers[3]],
  });
  
  const handleSave = () => {
    onUpdateUser({
      name,
      statusMessage,
      status,
      // Include other settings that might be part of the User type
      // notificationSettings,
      // privacySettings
    });
    onClose();
  };
  
  const statusOptions = [
    { value: 'online', label: 'Online', icon: '🟢' },
    { value: 'away', label: 'Away', icon: '🟡' },
    { value: 'busy', label: 'Busy', icon: '🔴' },
    { value: 'offline', label: 'Offline', icon: '⚫' }
  ];

  const handleToggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleTogglePrivacy = (setting: keyof typeof privacySettings) => {
    if (typeof privacySettings[setting] === 'boolean') {
      setPrivacySettings(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };

  const handleSelectPrivacy = (setting: string, value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed  inset-0 z-50 overflow-y-auto">
          <div className="flex relative  items-center justify-center min-h-screen px-4 text-center">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            

             

             {/* Modal */}

            
            <motion.div
              className="inline-block align-middle bg-white rounded-lg text-left shadow-xl transform transition-all max-w-lg w-full z-50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-medium text-gray-800">Settings</h3>
                <button
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === 'notifications' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  Notifications
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === 'privacy' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('privacy')}
                >
                  Privacy
                </button>
              </div>
              
              {/* Content */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative mb-2">
                        <Avatar
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          size="lg"
                          status={currentUser.status}
                        />
                        <button
                          className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full shadow-sm hover:bg-indigo-700 transition-colors"
                          aria-label="Change avatar"
                          title="Change avatar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">Click to upload a new photo</p>
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as User['status'])}
                        className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.icon} {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="statusMessage" className="block text-sm font-medium text-gray-700">
                        Status Message
                      </label>
                      <input
                        type="text"
                        id="statusMessage"
                        value={statusMessage}
                        onChange={(e) => setStatusMessage(e.target.value)}
                        placeholder="What are you up to?"
                        className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
                      />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={3}
                        placeholder="Tell us a bit about yourself"
                        className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
                        defaultValue={currentUser.bio || ''}
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-medium text-gray-900">Notification Settings</h4>
                    
                    <div className="space-y-4">
                      {/* New Message Notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">New Message</p>
                          <p className="text-xs text-gray-500">Get notified when you receive a new message</p>
                        </div>
                        <button 
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${notificationSettings.newMessage ? 'bg-indigo-600' : 'bg-gray-200'}`}
                          onClick={() => handleToggleNotification('newMessage')}
                        >
                          <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${notificationSettings.newMessage ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      {/* Friend Request Notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Friend Requests</p>
                          <p className="text-xs text-gray-500">Get notified when someone sends you a friend request</p>
                        </div>
                        <button 
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${notificationSettings.friendRequest ? 'bg-indigo-600' : 'bg-gray-200'}`}
                          onClick={() => handleToggleNotification('friendRequest')}
                        >
                          <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${notificationSettings.friendRequest ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      {/* Sound Effects */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Sound Effects</p>
                          <p className="text-xs text-gray-500">Play sounds when you receive notifications</p>
                        </div>
                        <button 
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${notificationSettings.soundEffects ? 'bg-indigo-600' : 'bg-gray-200'}`}
                          onClick={() => handleToggleNotification('soundEffects')}
                        >
                          <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${notificationSettings.soundEffects ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>

                      {/* Desktop Notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Desktop Notifications</p>
                          <p className="text-xs text-gray-500">Show notifications on your desktop</p>
                        </div>
                        <button 
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${notificationSettings.desktopNotifications ? 'bg-indigo-600' : 'bg-gray-200'}`}
                          onClick={() => handleToggleNotification('desktopNotifications')}
                        >
                          <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${notificationSettings.desktopNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>

                      {/* Email Notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                          <p className="text-xs text-gray-500">Send important notifications to your email</p>
                        </div>
                        <button 
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${notificationSettings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'}`}
                          onClick={() => handleToggleNotification('emailNotifications')}
                        >
                          <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>

                    {/* Notification Sounds Section */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Notification Sounds</h4>
                      <div className="space-y-2">
                        <div>
                          <label htmlFor="messageSound" className="block text-sm font-medium text-gray-700">
                            Message Sound
                          </label>
                          <select
                            id="messageSound"
                            className="mt-1 block w-full text-gray-600 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
                            defaultValue="chime"
                          >
                            <option value="chime">Chime</option>
                            <option value="bell">Bell</option>
                            <option value="ping">Ping</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                    
                    <div className="space-y-4">
                      {/* Show Online Status */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Show Online Status</p>
                          <p className="text-xs text-gray-500">Let others see when you're online</p>
                        </div>
                        <button 
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${privacySettings.showOnlineStatus ? 'bg-indigo-600' : 'bg-gray-200'}`}
                          onClick={() => handleTogglePrivacy('showOnlineStatus')}
                        >
                          <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${privacySettings.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      {/* Read Receipts */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Read Receipts</p>
                          <p className="text-xs text-gray-500">Let others know when you've read their messages</p>
                        </div>
                        <button 
                          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${privacySettings.showReadReceipts ? 'bg-indigo-600' : 'bg-gray-200'}`}
                          onClick={() => handleTogglePrivacy('showReadReceipts')}
                        >
                          <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${privacySettings.showReadReceipts ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      {/* Friend Requests */}
                      <div>
                        <label htmlFor="allowFriendRequests" className="block text-sm font-medium text-gray-700">
                          Who can send you friend requests
                        </label>
                        <select
                          id="allowFriendRequests"
                          value={privacySettings.allowFriendRequests}
                          onChange={(e) => handleSelectPrivacy('allowFriendRequests', e.target.value)}
                          className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
                        >
                          <option value="everyone">Everyone</option>
                          <option value="friends-of-friends">Friends of Friends</option>
                          <option value="nobody">Nobody</option>
                        </select>
                      </div>
                      
                      {/* Last Seen */}
                      <div>
                        <label htmlFor="whoCanSeeLastSeen" className="block text-sm font-medium text-gray-700">
                          Who can see your last seen
                        </label>
                        <select
                          id="whoCanSeeLastSeen"
                          value={privacySettings.whoCanSeeLastSeen}
                          onChange={(e) => handleSelectPrivacy('whoCanSeeLastSeen', e.target.value)}
                          className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
                        >
                          <option value="everyone">Everyone</option>
                          <option value="contacts">Contacts Only</option>
                          <option value="nobody">Nobody</option>
                        </select>
                      </div>
                    </div>

                    {/* Blocked Users */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Blocked Users</h4>
                      
                      {privacySettings.blockList && privacySettings.blockList.length > 0 ? (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {privacySettings.blockList.map((user, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center">
                                <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden mr-2">
                                  {user.avatar && (
                                    <picture>
                                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                                    </picture>
                                  )}
                                </div>
                                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
                              </div>
                              <button className="text-xs text-red-500 hover:text-red-700">
                                Unblock
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No blocked users</p>
                      )}
                    </div>

                    {/* Data Privacy */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Data & Privacy</h4>
                      <div className="space-y-2">
                        <button className="text-sm text-indigo-600 hover:text-indigo-800">
                          Download your data
                        </button>
                        <div>
                          <button className="text-sm text-red-600 hover:text-red-800">
                            Delete account
                          </button>
                          <p className="text-xs text-gray-500 mt-1">
                            This action is permanent and cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-end space-x-2 border-t">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </motion.div>
            

          </div>
        </div>
      )}
    </AnimatePresence>
  );
};


// UserProfileModal Component
interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: User;
    
}

function UserProfileModal({ isOpen, onClose, userData : user }: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'media'>('profile');
  const modalRef = useRef<HTMLDivElement | null>(null);
  
 
  
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Different activity icon based on type
  
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
            onClick={onClose}
          />
          
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative"
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-1 z-10 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Cover photo */}
            <div className="h-48 relative bg-gradient-to-r from-blue-400 to-indigo-500">
              <picture>
              <img 
                src={user.coverPhoto || "https://randomuser.me/api/portraits/thumb/men/75.jpg"} 
                alt="Cover" 
                className="w-full h-full object-cover" 
              />
              </picture>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent opacity-100"></div>
            </div>
            
            {/* User info section with avatar */}
            <div className="px-8 bg-white">
              <div className="flex flex-col md:flex-row items-start md:items-end relative -mt-16 mb-4">
                <Avatar src={user.avatar}
                      alt={user.name} 
                      size='xl'
                      status={user.status}                        
                      />
                
                {/* User name and info */}
                <div className="mt-5 md:mt-0 md:ml-4 flex-grow">
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500 text-sm">{user.statusMessage}</p>
                </div>
                
                {/* Action buttons */}
                <div className="">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4 mr-1.5" />
                    Friend
                  </motion.button>
                </div>
              </div>
              
              {/* Bio */}
              <p className="text-gray-600 text-sm mb-6">{user.bio}</p>
            </div>
            
            {/* Tabs navigation */}
            <div className="px-8 border-b border-gray-200">
              <div className="flex space-x-6">
                <TabButton 
                  active={activeTab === 'profile'} 
                  onClick={() => setActiveTab('profile')}
                  label="Profile"
                />
                <TabButton 
                  active={activeTab === 'media'} 
                  onClick={() => setActiveTab('media')}
                  label="Media"
                />
                
              </div>
            </div>
            
            {/* Tab content */}
            <div className="p-8 max-h-80 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <ProfileTab user={user} key="profile" />
                )}
                
                {activeTab === 'media' && (
                  <MediaTab medias={user.recentMedias} key="media" />
                )}
                
                
              </AnimatePresence>
            </div>
            
            {/* Footer section */}
            <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
              <p className="text-xs text-gray-500">Member since {user.joinDate.getFullYear()}</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-xs text-gray-500 hover:text-gray-700"
              >
                <Shield className="w-3 h-3 mr-1" />
                Report an issue
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Tab button component
function TabButton({ active, onClick, label }:{ active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative py-4 px-1 text-sm font-medium transition-colors ${
        active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
}

// Profile tab content
function ProfileTab({ user }:{user : User}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Contact info section */}
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
          
          <div className="flex items-start">
            <Mail className="w-4 h-4 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-gray-900">{user.email}</p>
              <p className="text-xs text-gray-500">Email</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="w-4 h-4 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-gray-900">{user.phone}</p>
              <p className="text-xs text-gray-500">Phone</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <LinkIcon className="w-4 h-4 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-gray-900">{user.website}</p>
              <p className="text-xs text-gray-500">Website</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Location info section */}
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Location & Time</h3>
          
          <div className="flex items-start">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-gray-900">{user.location}</p>
              <p className="text-xs text-gray-500">Location</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-gray-900">{user.timezone}</p>
              <p className="text-xs text-gray-500">Timezone</p>
            </div>
          </div>
        </div>
      </div>
      
    
      
      {/* Groups section */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Groups</h3>
        <div className="space-y-3">
          {user.groups?.map(group => (
            <div key={group.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{group.name}</p>
                <p className="text-xs text-gray-500">{group.members} members</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 text-sm font-medium"
              >
                View
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Activity tab content
function MediaTab({ medias }:{medias : Partial<User['recentMedias']>}) {
    if (!medias || medias.length === 0) {
        return <p className="text-gray-500">No recent activity</p>;
    }

    return (
    <div className="grid lg:grid-cols-3 gap-5" >
      {medias.map((md,index) => (
            <picture key={index}>
            <img 
            src={md?.media} 
            alt="Activity" 
            className="size-48 rounded-md object-cover" 
            />
            </picture>
      ))}
    </div>
  );
}




const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </motion.a>

            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </motion.a>

            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </motion.a>

            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-sm text-gray-500">
              &copy; {new Date().getFullYear()} ChatFlow, Inc. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Contact Us
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Animated Background Component
export const AnimatedBackground = ({numbers = 8}: {numbers?: number})=>{
  // const {height,width} = useWindowSize()
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden h-full w-full">
    {[...Array(numbers)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full opacity-30 blur-sm"
        initial={{
          width: Math.random() * 200 + 50,
          height: Math.random() * 200 + 50,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: 0.5,
          backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: [0.5, 0.8, 0.5],
          rotate: [0, 90],
          backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        }}
        transition={{
          duration: Math.random() * 20 + 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
  )



}


// Avatar Component
interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md', 
  status,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl : 'w-24 h-24'
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <picture>
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`}
        />
      </picture>
      {status && (
        <span 
          className={`absolute bottom-0 right-0 block rounded-full ${statusColors[status]} ring-2 ring-white`}
          style={{ width: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px', height: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px' }}
        />
      )}
    </div>
  );
};


// Button Component
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  icon
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};



// Typing Indicator
interface TypingIndicatorProps {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ user }) => {
  return (
    <div className="flex items-start mb-4">
      <div className="mr-2">
        <Avatar src={user.avatar} alt={user.name} size="sm" />
      </div>
      <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-none">
        <div className="flex space-x-1">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-gray-500 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: dot * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Status Update
interface StatusUpdatePickerProps {
  onSelectStatus: (text: string) => void;
}

const StatusUpdatePicker: React.FC<StatusUpdatePickerProps> = ({ onSelectStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const statusOptions = [
    { text: 'Away from keyboard', icon: '⌨️' },
    { text: 'Be right back', icon: '🔙' },
    { text: 'Busy', icon: '🚫' },
    { text: 'In a meeting', icon: '📅' },
    { text: 'At lunch', icon: '🍽️' },
    { text: 'On a call', icon: '📞' }
  ];
  
  return (
    <div className="relative">
      <button
        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Set status update"
        title="Set a status update"
      >
        <CircleDashed size={20} />
      </button>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute -bottom-[84] mb-2 -right-45 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="p-2 border-b">
            <p className="text-sm font-medium text-gray-700">Set a status</p>
          </div>
          <ul className="py-1">
            {statusOptions.map((option, index) => (
              <li key={index}>
                <button
                  className="w-full text-gray-700 text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                  onClick={() => {
                    onSelectStatus(option.text);
                    setIsOpen(false);
                  }}
                >
                  <span className="mr-2">{option.icon}</span>
                  <span >{option.text}</span>
                </button>
              </li>
            ))}
            
          </ul>
          <div className="p-2 border-t">
            <input
              type="text"
              className="w-full text-sm p-2 text-gray-700 border rounded-md"
              placeholder="Custom status..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                  onSelectStatus(e.currentTarget.value);
                  setIsOpen(false);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};




// Message Input Component
interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onStartTyping: () => void;
  onStopTyping: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  onStartTyping,
  onStopTyping,
}) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Common emojis for quick access
  const quickEmojis = ['😊', '👍', '❤️', '😂', '🎉', '🔥', '👏', '🙏'];
  
  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Handle typing indicator
    onStartTyping();
    
    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Set new timeout
    const newTimeout = setTimeout(() => {
      onStopTyping();
    }, 2000);
    
    setTypingTimeout(newTimeout);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
      
      // Stop typing indicator
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      onStopTyping();
    }
  };
  
  const insertEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setIsEmojiPickerOpen(false);
    
    // Focus back on the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  

  return (
    <div className="border-t border-b border-r border-gray-200 rounded-br-lg bg-white p-3 ">
      <div className="flex items-end bg-gray-100 rounded-lg p-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-0 outline-none focus:ring-0 resize-none max-h-24 text-gray-800 placeholder-gray-500 p-2"
          placeholder="Type a message..."
          rows={1}
          style={{ minHeight: '24px' }}
        />
        
        <div className="flex items-center space-x-2 pl-2">
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              aria-label="Insert emoji"
              title="Insert emoji"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
              </svg>
            </button>
            
            <AnimatePresence>
            {isEmojiPickerOpen && (
              <motion.div
                className="absolute bottom-full w-60  right-0 mb-2 bg-white rounded-lg shadow-lg border p-2 z-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="grid grid-cols-4 gap-2">
                  {quickEmojis.map(emoji => (
                    <button
                      key={emoji}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-xl"
                      onClick={() => insertEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          
          
          <button
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            onClick={sendMessage}
            disabled={!message.trim()}
            aria-label="Send message"
            title="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};























































