import React, {useEffect, useMemo, useState} from 'react';
import {
  Channel,
  DeepPartial,
  MessageInput,
  MessageList,
  Theme,
  ThemeProvider,
  useChannelContext,
  useChatContext,
  useMessageInputContext,
} from 'stream-chat-expo';
import {Channel as ChannelType} from 'stream-chat';
import {useLocalSearchParams} from 'expo-router';
import {ImageBackground, StatusBar} from 'react-native';
import HeaderComponent from '@/components/header/Header';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import patternBg from '@/assets/images/patternBg.png';
import CloseIcon from '@/assets/svgs/closeIconPlain.svg';
// import RecordingIcon from '@/assets/svgs/RecordingIcon.svg';
import PressableComponent from '@/components/pressable/PressableComponent';
import palette from '@/constants/colors/pallete';
import {Skeleton} from 'moti/skeleton';
import useProfile from '@/service/profile';
import SlideUpComponent from '@/components/layout/SlideUpComponent';
import TextComponent from '@/components/text/TextComponent';
import {ScaledSheet} from 'react-native-size-matters';
import PredefinedMessage from '@/components/uttility/PredefinedMessage';
import {groupchatconst} from '@/constants/utils/constants';

const ChatChannel = () => {
  const [channel, setChannel] = useState<ChannelType>();
  const {id} = useLocalSearchParams();
  const {useGetProfile} = useProfile();
  const {profileData} = useGetProfile();
  // const {channel: currentChannel,} = useChatContext();

  // console.log({
  //   currentChannel,
  // });

  const userData = profileData?.user ?? {};
  const {client} = useChatContext?.();
  const {channel: channelCtx} = useChannelContext();

  console.log({
    channelCtx,
  });
  const isGroup = useMemo(
    () => channel?.data?.type === groupchatconst,
    [channel?.data?.type],
  );
  const [showOptions, setShowOptions] = useState(false);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const chatOptions = useMemo(
    () => [
      ...(!isGroup
        ? []
        : [
            {
              title: 'Sponsor Plan',
              desc: 'Sponsor this user as they are on a freemium.',
              onPress: () => {},
            },
            {
              title: 'Block',
              desc: 'This user can no longer see or interact with you once blocked.',
              onPress: () => {},
            },
            {
              title: 'Report',
              desc: 'Your report will be anonymous',
              onPress: () => {},
            },
            {
              title: 'Jilt',
              desc: 'No longer interested in user? Remove from matches',
              onPress: () => {},
            },
          ]),
    ],
    [isGroup],
  );
  const StreamButton = () => {
    const {sendMessage, text, imageUploads, fileUploads} =
      useMessageInputContext();
    const isDisabled = !text && !imageUploads.length && !fileUploads.length;

    return (
      <PressableComponent disabled={isDisabled} onPress={sendMessage}>
        <></>
      </PressableComponent>
    );
  };
  useEffect(() => {
    const fetchChannel = async () => {
      const _id = typeof id === 'string' ? id : id?.[0];

      const channeels = await client.queryChannels({
        id: {
          $eq: _id,
        },
        members: {$in: [(userData?.id ?? '').toString()]},
      });
      // console.log({
      //   members: channeels?.[0]?.queryMembers({
      //     created_at: $exists,
      //   }),
      // });
      setChannel(channeels?.[0]);
    };
    fetchChannel();
  }, [client, id, userData?.id]);
  const sendMessage = (mess: string) => {
    channel?.sendMessage({text: mess});
  };
  const sort = {user_id: -1};
  // const membersList = async () => await channel?.queryMembers({}, sort, {});
  // console.log({
  //   membersList: membersList(),
  // });
  const getTotalMessagesByUser = async () => {
    try {
      // Assume the client is already initialized and connected

      // Query all messages in the channel sent by the specific user
      const response = await client.search(
        {cid: channel?.cid ?? ''},
        {sender_id: userData?.id ?? ''},
        {limit: 3}, // limit is optional, used to paginate if there are a lot of messages
      );

      // Get the total number of messages sent by the user
      console.log({
        sender_id: userData?.id,
        result: response?.results,
      });

      const totalMessages = response.results.length;

      return totalMessages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return 0;
    }
  };
  console.log({
    '-------------curre nt channe ll ------': channel?.data,
  });

  // useEffect(() => {
  //   if (channel?.cid) {
  //     getTotalMessagesByUser().then(totalMessages => {
  //       console.log(`Total messages sent by the user: ${totalMessages}`);
  //     });
  //   }
  // }, [channel?.cid]);

  if (!channel) {
    return (
      <Box style={[globalStyle.justifyEnd]} flex={1}>
        <Skeleton colorMode={'light'} width={'100%'} height={50} />

        <Box flex={1} style={[globalStyle.justifyEnd, globalStyle.px1p2]}>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.justifyEnd,
              globalStyle.pb1p2,
              globalStyle.w10,
            ]}>
            <Skeleton colorMode={'light'} width={150} height={50} />
          </Box>
          <Box
            style={[globalStyle.flexrow, globalStyle.pb1p2, globalStyle.w10]}>
            <Skeleton colorMode={'light'} width={150} height={50} />
          </Box>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.justifyEnd,
              globalStyle.pb1p2,
              globalStyle.w10,
            ]}>
            <Skeleton colorMode={'light'} width={150} height={50} />
          </Box>
          <Box
            style={[globalStyle.flexrow, globalStyle.pb1p2, globalStyle.w10]}>
            <Skeleton colorMode={'light'} width={150} height={50} />
          </Box>
        </Box>
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.justifyCenter,
          ]}>
          <Skeleton colorMode={'light'} width={50} height={50} />

          <Box flex={1} style={[globalStyle.px0p8]}>
            <Skeleton colorMode={'light'} width={'100%'} height={50} />
          </Box>
          <Skeleton colorMode={'light'} width={50} height={50} />
        </Box>
      </Box>
    );
  }
  const theme: DeepPartial<Theme> = {
    messageList: {
      container: {
        backgroundColor: 'transparent',
      },
      messageContainer: {
        backgroundColor: palette.messageBg,
      },
      messageSystem: {
        textContainer: {
          backgroundColor: palette.messageBg,
        },
      },
    },
    messageInput: {
      audioRecordingButton: {
        micIcon: {
          fill: palette.primaryDefault,
          height: 24,
          width: 24,
        },
      },
      audioRecordingLockIndicator: {
        arrowUpIcon: {
          height: 24,
          width: 24,
        },
        lockIcon: {
          height: 24,
          width: 24,
        },
      },
      audioRecordingWaveform: {
        waveform: {
          height: 12,
          width: 12,
        },
      },
      inputBox: {
        fontSize: 13,
        fontFamily: 'DMSans-Regular',
        // height: 16,
        padding: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
      },
      sendUpIcon: {
        fill: palette.primaryDefault,
        width: 24,
        height: 24,
      },

      // sendButton: {
      //   backgroundColor: palette.primaryDefault,
      // },
    },
    messageSimple: {
      card: {
        container: {
          backgroundColor: palette.primary20,
        },
        playIcon: {
          height: 12,
          width: 12,
        },
        playButtonStyle: {
          durationTextStyle: {
            fontSize: 10,
          },
        },
      },

      content: {
        senderMessageBackgroundColor: palette.secondaryDefault,
        receiverMessageBackgroundColor: palette.loaderDark,
        messageUser: {
          color: palette.white,
        },

        metaText: {
          color: palette.white,
        },
        textContainer: {
          // backgroundColor: 'red',
        },

        markdown: {
          text: {
            color: palette.white,
            fontFamily: 'DMSans-Regular',
            fontSize: 13,
          },
          mentions: {
            color: palette.primaryDefault,
          },
          blockQuoteSectionBar: {
            backgroundColor: palette.white10,
          },
        },
      },

      fileAttachmentGroup: {
        attachmentContainer: {
          backgroundColor: palette.transparent,
        },
        container: {
          backgroundColor: palette.transparent,
        },
      },
      giphy: {
        container: {
          backgroundColor: palette.transparent,
        },
      },
    },
    progressControl: {
      filledColor: palette.white,
    },
    waveProgressBar: {
      container: {
        height: 16,
      },
    },
  };
  return (
    <>
      <Box style={[globalStyle.bgTransparent]} flex={1}>
        <StatusBar barStyle={'dark-content'} />
        <ThemeProvider style={theme}>
          <Channel
            // SendButton={StreamButton}
            asyncMessagesMultiSendEnabled
            audioRecordingEnabled
            hasFilePicker={false}
            hasImagePicker={false}
            keyboardVerticalOffset={0}
            // deletedMessagesVisibilityType="receiver"
            deletedMessagesVisibilityType="always"
            channel={channel}>
            <ImageBackground style={[globalStyle.flexOne]} source={patternBg}>
              <Box style={[globalStyle.py1p2, globalStyle.px2]}>
                <HeaderComponent
                  text={channel?.data?.name ?? ''}
                  useGray
                  transparent
                  showEllipse
                  onPress={() => {
                    setShowOptions(true);
                  }}
                  blackText
                />
              </Box>
              <MessageList
              // myMessageTheme={{
              //   messageList: {
              //     messageSystem: {
              //       text: {
              //         color: palette.black,
              //         // color: palette.white,
              //         fontFamily: 'DMSans-Regular',
              //       },
              //     },
              //     typingIndicatorContainer: {
              //       backgroundColor: palette.messageBg,
              //     },
              //   },
              // }}
              />
              <PredefinedMessage onPress={sendMessage} />

              <MessageInput disabled={true} />
            </ImageBackground>
          </Channel>
        </ThemeProvider>
      </Box>

      {showOptions && (
        <SlideUpComponent>
          <Box
            style={[globalStyle.p2, globalStyle.modalBr, globalStyle.bgWhite]}>
            <Box
              style={[
                globalStyle.pb1p6,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.justifyBetween,
              ]}>
              <Box style={[globalStyle.flexrow, globalStyle.alignItemsCenter]}>
                <Box
                  style={[
                    chatStyle.imgSize,
                    globalStyle.br,
                    globalStyle.bgBlack,
                  ]}></Box>
                <Box style={[globalStyle.pl0p8]}>
                  <TextComponent
                    style={[globalStyle.fontSize15, globalStyle.fontWeight500]}>
                    {'Theressa Webb'}
                  </TextComponent>
                  <TextComponent
                    gray
                    style={[
                      globalStyle.fontSize12,
                      globalStyle.fontMatterLight,
                      globalStyle.pt0p4,
                    ]}>
                    {'Cairo, egypt'}
                  </TextComponent>
                </Box>
              </Box>

              <PressableComponent onPress={() => setShowOptions(false)}>
                <CloseIcon />
              </PressableComponent>
            </Box>
            <TextComponent gray style={[globalStyle.fontSize12]}>
              MORE
            </TextComponent>

            <Box style={[globalStyle.pt1p6]}>
              {chatOptions.map(({desc, onPress, title}) => (
                <PressableComponent
                  style={[globalStyle.mb0p8]}
                  onPress={onPress}
                  key={title}>
                  <TextComponent
                    style={[globalStyle.fontSize15, globalStyle.fontWeight500]}>
                    {title}
                  </TextComponent>
                  <TextComponent
                    gray
                    style={[
                      globalStyle.fontSize12,
                      globalStyle.fontMatterLight,
                      globalStyle.pt0p4,
                    ]}>
                    {desc}
                  </TextComponent>
                </PressableComponent>
              ))}
            </Box>
          </Box>
        </SlideUpComponent>
      )}
    </>
  );
};

const chatStyle = ScaledSheet.create({
  imgSize: {
    width: '40@s',
    height: '40@s',
  },
});

export default ChatChannel;
