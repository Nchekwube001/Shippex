import React, {useState} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import HeaderComponent from '@/components/header/Header';
import TextComponent from '@/components/text/TextComponent';
import SelectComponent from '@/components/select/SelectComponent';
import ModalHeaderRow from '@/components/uttility/ModalHeaderRow';
import LogoComponent from '@/components/globals/LogoComponent';
import SlideUpComponent from '@/components/layout/SlideUpComponent';
import ButtonComponent from '@/components/button/ButtonComponent';
import TextInputComponent from '@/components/textInputs/TextInputComponent';
import TitleDescBox from '@/components/uttility/TitleDescBox';
import SuccessComponent from '@/components/success/SuccessComponent';
import {router} from 'expo-router';
import useAuth from '@/service/auth';
import Loader from '@/components/loader/Loader';

const DeleteAccount = () => {
  const {useDeleteAccountMutation} = useAuth();
  const {deleteUserMutation, isLoading} = useDeleteAccountMutation();
  const [type, setType] = useState<'rel' | 'bill' | 'serve' | 'others' | ''>(
    '',
  );
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const deleteOptions = [
    {
      title: 'Found/In a relationship',
      onPress: () => setType('rel'),
    },
    {
      title: 'Billing Issue',
      onPress: () => setType('bill'),
    },
    {
      title: 'Dissatisfied with service',
      onPress: () => setType('serve'),
    },
    {
      title: 'Others',
      onPress: () => setType('others'),
    },
  ];
  const onDeleteAcct = () => {
    deleteUserMutation(
      {},
      {
        onSuccess: () => {
          setSuccess(true);
        },
      },
    );
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : success ? (
        <SuccessComponent
          title="Account Deleted"
          desc="Your profile/account has been deleted. Thank you for using Kinnect!"
          btnText="Done"
          btnOnPress={() => router.replace('/login')}
        />
      ) : (
        <LayoutWithSafeArea>
          <Box style={[globalStyle.px1p6]}>
            <HeaderComponent text="Delete My Account" />
            <Box style={[globalStyle.pt1p6]}>
              <TextComponent style={[globalStyle.lineHeight20]}>
                Sorry to see you go! Please select a reason for deleting your
                profile/account:
              </TextComponent>
            </Box>
            <Box style={[globalStyle.pt1p6]}>
              {deleteOptions.map(({onPress, title}) => (
                <Box key={title} style={[globalStyle.pb2]}>
                  <SelectComponent
                    value={title}
                    label=""
                    placeholder=""
                    onPress={() => {
                      onPress();
                      setShowModal(true);
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </LayoutWithSafeArea>
      )}
      {showModal && (
        <SlideUpComponent>
          <Box
            backgroundColor={'mainBackground'}
            style={[globalStyle.py1p6, globalStyle.modalBr]}>
            <ModalHeaderRow title="" onPress={() => setShowModal(false)} />
            <Box style={[globalStyle.px2p4]}>
              <Box
                style={[
                  globalStyle.pt2p4,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                  globalStyle.w10,
                ]}>
                <LogoComponent />
                <Box style={[globalStyle.pt1p2]}>
                  <TitleDescBox
                    isCenter
                    twenty
                    title={
                      type === 'bill'
                        ? 'Billing Issue'
                        : type === 'others'
                        ? 'Others (Please Specify)'
                        : type === 'rel'
                        ? 'Found/In A Relationship'
                        : 'Dissatisfied with Service'
                    }
                    desc={
                      type === 'bill'
                        ? "Sorry to hear you're experiencing billing issues. Our support team will assist you. Please contact us at [support email] so we can resolve this for you."
                        : type === 'others'
                        ? "Thank you. We'll take your feedback into consideration. Your profile/account will be deleted."
                        : type === 'rel'
                        ? "Congratulations on finding someone special! We're glad Kinnect could play a part. Your profile/account will be deleted. Good luck in your new relationship!"
                        : "Sorry Kinnect didn't meet your expectations. We'd love to hear more about your experience. Your feedback will help us improve. Your profile/account will be deleted."
                    }
                  />
                </Box>
                {(type === 'others' || type === 'serve') && (
                  <Box style={[globalStyle.pt1p2, globalStyle.w10]}>
                    <TextInputComponent
                      value={reason}
                      onChangeText={setReason}
                      placeholder="Write here"
                      title=""
                      multiline
                    />
                  </Box>
                )}
              </Box>
              <Box style={[globalStyle.pt3]}>
                <ButtonComponent
                  title="Delete my Account"
                  onPress={onDeleteAcct}
                />
              </Box>
            </Box>
          </Box>
        </SlideUpComponent>
      )}
    </>
  );
};

export default DeleteAccount;
