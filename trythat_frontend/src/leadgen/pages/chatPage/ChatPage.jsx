import { CometChatUsersWithMessages } from '@cometchat/chat-uikit-react'; //import the component in your App.js file
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CometChatUIKit, UIKitSettingsBuilder } from '@cometchat/chat-uikit-react';
import './chatPage.scss';
import { Result } from 'antd';

const ChatPage = () => {
  const { user } = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(true);

  useEffect(() => {
    const userId = user?.id;
    // CometConnection(user?.id);
    const COMETCHAT_CONSTANTS = {
      APP_ID: process.env.REACT_APP__COMETCHAT_APPID, //Replace with your App ID
      REGION: process.env.REACT_APP__COMETCHAT_REGION, //Replace with your App Region
      AUTH_KEY: process.env.REACT_APP__COMETCHAT_AUTHKEY, //Replace with your Auth Key
    };

    //create the builder
    const UIKitSettings = new UIKitSettingsBuilder()
      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
      .subscribePresenceForFriends()
      .build();

    
    //Initialize CometChat UIKit
    try {
      CometChatUIKit.init(UIKitSettings)
        .then(() => {
          // You can now call login function.
        })
        .catch((err) => console.log(err));

      CometChatUIKit.getLoggedinUser().then((user) => {
        try {
          if (!user) {
            //Login user
            CometChatUIKit.login(userId, COMETCHAT_CONSTANTS?.AUTH_KEY)
              .then((user) => {
                //mount your app
                setLoading(false);
              })
              .catch((err) => setUserExists(false));
          } else {
            //mount your app
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <section  className='chat-container'>
      <div className='chat-container__box'
      >
        <div 
          className="custom-chat-container"
        >
          {!loading && <CometChatUsersWithMessages unreadCount={true} sendEmojis={false} sendFiles={false} />}
          {!userExists && (
            <Result
              status="404"
              title="User Not Found"
              subTitle="Oops, unable to login into chat please contact administrator!"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
