import React, {useMemo, useState} from 'react';
import LayoutWithSafeArea from '@/components/layout/LayoutWithSafeArea';
import Box from '@/components/layout/Box';
import globalStyle from '@/globalStyle/globalStyle';
import SearchInputComponent from '@/components/textInputs/SearchInputComponent';
import Notification from '@/assets/svgs/Notification.svg';
import ShippexBlue from '@/assets/svgs/ShippexBlue.svg';
import User from '@/assets/svgs/User.svg';
import ScanIcon from '@/assets/svgs/ScanIcon.svg';
import Filter from '@/assets/svgs/Filter.svg';
import BoxLogo from '@/assets/svgs/BoxLogo.svg';
import ArrowBoth from '@/assets/svgs/ArrowBoth.svg';
import ArrowRight from '@/assets/svgs/ArrowRight.svg';
import PressableComponent from '@/components/pressable/PressableComponent';
import TextComponent from '@/components/text/TextComponent';
import CheckboxComponent from '@/components/checkBox/Checkbox';
import SlideUpComponent from '@/components/layout/SlideUpComponent';
type filterOptions =
  | 'Received'
  | 'Putaway'
  | 'Delivered'
  | 'Canceled'
  | 'Rejected'
  | 'Lost'
  | 'On hold';
type arrayType = {
  name: string;
  status: filterOptions;
  route: {
    from: string;
    to: string;
  };
  id: string;
}[];
const shipData: arrayType = [
  {
    name: 'AWB',
    id: '41785691423',
    route: {
      from: 'Cairo',
      to: 'Alexandria',
    },
    status: 'Delivered',
  },
  {
    name: 'ANB',
    id: '41785691423',
    route: {
      from: 'Cairo',
      to: 'Alexandria',
    },
    status: 'Canceled',
  },
  {
    name: 'ALB',
    id: '41785691423',
    route: {
      from: 'Cairo',
      to: 'Alexandria',
    },
    status: 'Lost',
  },
  {
    name: 'BWB',
    id: '41785691423',
    route: {
      from: 'Cairo',
      to: 'Alexandria',
    },
    status: 'On hold',
  },
  {
    name: 'AWO',
    id: '41785691423',
    route: {
      from: 'Cairo',
      to: 'Alexandria',
    },
    status: 'Putaway',
  },
  {
    name: 'QWB',
    id: '41785691423',
    route: {
      from: 'Cairo',
      to: 'Alexandria',
    },
    status: 'Received',
  },
  {
    name: 'AWL',
    id: '41785691423',
    route: {
      from: 'Cairo',
      to: 'Alexandria',
    },
    status: 'Rejected',
  },
];
const Shipment = () => {
  const filterData: filterOptions[] = [
    'Canceled',
    'Delivered',
    'Lost',
    'On hold',
    'Putaway',
    'Received',
    'Rejected',
  ];
  const [markAll, setmarkAll] = useState(false);
  const [filterList, setFilterList] = useState<filterOptions[]>([]);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [showFilterModal, setShowFIlterModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const shipmentList = useMemo(
    () =>
      filterList.length === 0
        ? shipData
        : shipData.filter(item => {
            return (
              // item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              filterList.some(val => item.status.includes(val))
            );
          }),
    [filterList],
  );

  const addToList = (val: number) => {
    if (selectedList.includes(val)) {
      const excluded = selectedList.filter(item => item !== val);
      setSelectedList(excluded);
    } else {
      setSelectedList(prev => [...prev, val]);
    }
  };
  const onAddFilter = (val: filterOptions) => {
    if (filterList.includes(val)) {
      const excluded = filterList.filter(item => item !== val);
      setFilterList(excluded);
    } else {
      setFilterList(prev => [...prev, val]);
    }
  };

  return (
    <>
      <LayoutWithSafeArea>
        <Box style={[globalStyle.px2]}>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
              globalStyle.justifyBetween,
              globalStyle.pt1p2,
            ]}>
            <User />
            <ShippexBlue />
            <Notification />
          </Box>
          <Box style={[globalStyle.pt1p6]}>
            <SearchInputComponent
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
            />
          </Box>
          <Box
            style={[
              globalStyle.pt1p6,
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
            ]}>
            <Box style={[globalStyle.w5, globalStyle.pr0p8]}>
              <PressableComponent
                onPress={() => setShowFIlterModal(true)}
                style={[
                  globalStyle.w10,
                  globalStyle.borderRadius8,
                  globalStyle.bgTextInput,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                  globalStyle.flexrow,
                  globalStyle.py0p8,
                ]}>
                <Filter />
                <TextComponent
                  style={[globalStyle.pl0p6, globalStyle.textGray]}>
                  Filters
                </TextComponent>
              </PressableComponent>
            </Box>
            <Box style={[globalStyle.w5, globalStyle.pl0p8]}>
              <PressableComponent
                style={[
                  globalStyle.w10,
                  globalStyle.borderRadius8,
                  globalStyle.bgPrimary,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                  globalStyle.flexrow,
                  globalStyle.py0p8,
                ]}>
                <ScanIcon />
                <TextComponent
                  style={[globalStyle.pl0p6, globalStyle.textWhite]}>
                  Add Scan
                </TextComponent>
              </PressableComponent>
            </Box>
          </Box>
          <Box
            style={[
              globalStyle.pt1p6,
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
              globalStyle.justifyBetween,
            ]}>
            <TextComponent
              style={[
                globalStyle.fontSize18,
                globalStyle.fontGroteskBook20,
                globalStyle.fontWeight600,
              ]}>
              Shipments
            </TextComponent>
            <Box
              style={[
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.justifyBetween,
              ]}>
              <CheckboxComponent value={markAll} setValue={setmarkAll} />
              <TextComponent
                style={[globalStyle.pl0p6, globalStyle.textPrimary]}>
                Mark All
              </TextComponent>
            </Box>
          </Box>
          <Box style={[globalStyle.pt1p6]}>
            {shipmentList.map(({id, name, route, status}, index) => (
              <PressableComponent
                onPress={() => addToList(index)}
                key={index.toString()}
                style={[
                  globalStyle.py0p8,
                  globalStyle.borderRadius8,
                  globalStyle.px0p8,
                  globalStyle.flexrow,
                  globalStyle.alignItemsCenter,
                  globalStyle.justifyBetween,
                  globalStyle.bgTextInput,
                  globalStyle.mb1p6,
                ]}>
                <Box>
                  <CheckboxComponent
                    value={selectedList.includes(index) || markAll}
                    setValue={() => addToList(index)}
                  />
                </Box>
                <Box
                  style={[
                    globalStyle.px0p8,
                    globalStyle.flexrow,
                    globalStyle.alignItemsCenter,
                  ]}
                  flex={1}>
                  <BoxLogo />
                  <Box flex={1} style={[globalStyle.pl0p5]}>
                    <TextComponent
                      style={[globalStyle.fontSize12, globalStyle.textGray]}>
                      {name}
                    </TextComponent>
                    <TextComponent
                      style={[
                        globalStyle.pt0p2,
                        globalStyle.fontGroteskBook20,
                        globalStyle.fontSize16,
                        globalStyle.fontWeight500,
                      ]}>
                      {id}
                    </TextComponent>
                    <Box
                      style={[
                        globalStyle.pt0p2,
                        globalStyle.flexrow,
                        globalStyle.alignItemsCenter,
                      ]}>
                      <TextComponent
                        style={[globalStyle.fontSize12, globalStyle.textGray]}>
                        {route.from}
                      </TextComponent>
                      <Box style={[globalStyle.px0p2]}>
                        <ArrowRight />
                      </Box>
                      <TextComponent
                        style={[globalStyle.fontSize12, globalStyle.textGray]}>
                        {route.to}
                      </TextComponent>
                    </Box>
                  </Box>
                  <Box
                    style={[
                      globalStyle.mr0p8,
                      globalStyle.borWhite,
                      globalStyle.borderRadius6,
                      globalStyle.px0p4,
                      globalStyle.py0p2,
                      status === 'Lost' || status === 'Rejected'
                        ? globalStyle.bgError
                        : status === 'On hold'
                        ? globalStyle.bgHold
                        : status === 'Received'
                        ? globalStyle.bgReceived
                        : status === 'Delivered'
                        ? globalStyle.bgDelivered
                        : globalStyle.bgTransparent,
                    ]}>
                    <TextComponent
                      style={[
                        globalStyle.fontSize12,

                        status === 'Lost' || status === 'Rejected'
                          ? globalStyle.textError
                          : status === 'On hold'
                          ? globalStyle.textHold
                          : status === 'Received'
                          ? globalStyle.textReceived
                          : status === 'Delivered'
                          ? globalStyle.textDelivered
                          : globalStyle.textGray,
                      ]}>
                      {status}
                    </TextComponent>
                  </Box>
                  <Box>
                    <ArrowBoth />
                  </Box>
                </Box>
              </PressableComponent>
            ))}
          </Box>
        </Box>
      </LayoutWithSafeArea>

      {showFilterModal && (
        <SlideUpComponent>
          <Box
            style={[
              globalStyle.bgWhite,
              globalStyle.p1p6,
              globalStyle.modalBr,
              globalStyle.pb10,
            ]}>
            <Box
              style={[
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.justifyBetween,
              ]}>
              <PressableComponent onPress={() => setShowFIlterModal(false)}>
                <TextComponent style={[globalStyle.textPrimary]}>
                  Cancel
                </TextComponent>
              </PressableComponent>
              <TextComponent
                style={[
                  globalStyle.fontGroteskBook25,
                  globalStyle.fontSize16,
                  globalStyle.fontWeight600,
                ]}>
                Filters
              </TextComponent>
              <PressableComponent onPress={() => setShowFIlterModal(false)}>
                <TextComponent style={[globalStyle.textPrimary]}>
                  Done
                </TextComponent>
              </PressableComponent>
            </Box>
            <Box style={[globalStyle.pt1p2]}>
              <TextComponent
                style={[globalStyle.textGray, globalStyle.fontSize12]}>
                SHIPMENT STATUS
              </TextComponent>
            </Box>
            <Box
              style={[
                globalStyle.pt1p6,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.flexwrap,
              ]}>
              {filterData.map(item => (
                <PressableComponent
                  onPress={() => onAddFilter(item)}
                  key={item}
                  style={[
                    globalStyle.bgTextInput,
                    globalStyle.borderRadius8,
                    globalStyle.px1,
                    globalStyle.py0p8,
                    globalStyle.mr0p8,
                    globalStyle.mb1p2,
                    globalStyle.borTransparent,
                    filterList.includes(item) && globalStyle.borPrimary,
                  ]}>
                  <TextComponent
                    style={[
                      globalStyle.textGray,
                      filterList.includes(item) && globalStyle.textPrimary,
                    ]}>
                    {item}
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

export default Shipment;
