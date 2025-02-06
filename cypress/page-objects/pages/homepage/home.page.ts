import ProfileDetails from './profile-details';
import CreatePostWidget from './create-post-widget';
import FeedPostWidget from './feed-post-widget';
import FriendList from './friend-list';
import NavBar from 'cypress/page-objects/global-components/nav-bar';
import BasePage from '../base.page';

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
