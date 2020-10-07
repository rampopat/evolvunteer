import { faDrumstickBite, faComment, faUsers, faCommentAlt, faBrain, faFirstAid, faCogs, faCoins, faBullhorn } from '@fortawesome/free-solid-svg-icons'

export const API_ROOT = 'https://gamma-group26.herokuapp.com/'
// export const API_ROOT = 'http://localhost:8000/'

export const SKILLS = [
  {
    name: "Communication",
    description: "e.g. public speaking, languages, ",
    handle: "communication",
    iconName: faComment
  },
  {
    name: "Technical",
    description: "e.g. data science, excel ",
    handle: "technical",
    iconName: faCogs
  },
  {
    name: "Finance",
    description: "e.g. sales, purchasing ",
    handle: "finance",
    iconName: faCoins
  },
  {
    name: "Marketing",
    description: "e.g. advertising, promotion ",
    handle: "marketing",
    iconName: faBullhorn
  },
  {
    name: "Medical",
    description: "e.g. health & safety, first aid, driving",
    handle: "medical",
    iconName: faFirstAid
  },
  {
    name: "Teamwork",
    description: "e.g. management, leadership",
    handle: "teamwork",
    iconName: faUsers
  },
  {
    name: "Problem Solving",
    description: "e.g. maths, ",
    handle: "problem_solving",
    iconName: faCommentAlt
  },
  {
    name: "Creativity",
    description: "e.g. arts, music, ",
    handle: "creativity",
    iconName: faBrain
  },
  {
    name: "Craftsmanship",
    description: "e.g. carpentry",
    handle: "craftmanship",
    iconName: faDrumstickBite
  }
];