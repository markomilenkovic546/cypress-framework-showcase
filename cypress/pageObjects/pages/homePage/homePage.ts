import ProfileDetails from './profileGeneralDetails';
import CreatePostWidget from './createPostWidget';
import FeedPostWidget from './feedPostWidget';
import FriendList from './friendList';
import NavBar from 'cypress/pageObjects/globalComponents/navBar';
import BasePage from '../basePage';

export default class HomePage extends BasePage {
    readonly profileDetails: ProfileDetails;
    readonly createPostWidget: CreatePostWidget;
    readonly feedPostWidget: FeedPostWidget;
    readonly friendList: FriendList;
    readonly navBar: NavBar;

    constructor() {
        super();
        this.profileDetails = new ProfileDetails();
        this.createPostWidget = new CreatePostWidget();
        this.feedPostWidget = new FeedPostWidget();
        this.friendList = new FriendList();
        this.navBar = new NavBar();
    }
}
