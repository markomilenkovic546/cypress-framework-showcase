import ProfileDetails from './profile-details';
import CreatePostWidget from './create-post-widget';
import FeedPostWidget from './feed-post-widget';
import FriendList from './friend-list';
import NavBar from 'cypress/page-objects/global-components/nav-bar';
import BasePage from '../base.page';

export default class HomePage extends BasePage {
    readonly profileDetails: ProfileDetails = new ProfileDetails();
    readonly createPostWidget: CreatePostWidget = new CreatePostWidget();
    readonly feedPostWidget: FeedPostWidget = new FeedPostWidget();
    readonly friendList: FriendList = new FriendList();
    readonly navBar: NavBar = new NavBar();

    open() {
        super.open('/home');
    }
}
