import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE, SEARCH, START_LOADING, END_LOADING, FETCH_POST } from '../utils/constants';

const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages };
        case FETCH_POST:
            return { ...state, post: action.payload.post };
        case SEARCH:
            return { ...state, posts: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => (post._id !== action.payload)) };
        default:
            return state;
    }
};

export default postsReducer;