import React, { useEffect, useState } from 'react';
import './searchPage.scss';
import { Radio, Spin, Switch, Tag, Typography } from 'antd';
import Property from './components/property/Property';
import Organization from './components/organization/Organization';
import Contacts from './components/contacts/Contacts';
import Wishlist from './components/wishlist/Wishlist';
import Units from './components/units/Units';
import ResidentialProperty from './components/residentialProperty/ResidentialProperty';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteResources,
  getSearchResults,
  getWishlistContent,
  getWishlistContentWithPoints,
  reset_data,
  saveResources,
  setSearchContext,
  setpropertyToggle,
  showSearchBar,
  viewLessOrganization,
  viewLessOrganizationConnectsFlow,
  viewLessProperty,
  viewLessPropertyOrganizationFlow,
  viewLessResidentialProperty,
  viewMoreConnects,
  viewMoreOrganization,
  viewMoreOrganizationConnectsFlow,
  viewMoreProperty,
  viewMoreResidentialProperty,
} from '../../features/searchSlice';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  // hooks
  const dispatch = useDispatch();

  // states
  const { searchContext } = useSelector((state) => state.search);

  const {
    propertyData,
    residentialPropertyData,
    organizationsData,
    connectsData,
    column1View,
    column2View,
    column3View,
    loading,
    wishlist,
    searchClasifier,
    propertyToggle,
    unitsData,
  } = useSelector((store) => store.search);

  useEffect(() => {
    dispatch(showSearchBar(true));
    dispatch(getWishlistContentWithPoints());
    dispatch(setpropertyToggle(true));
    dispatch(setSearchContext('commercialProperty'));
    return () => {
      dispatch(showSearchBar(false));
      dispatch(reset_data());
    };
  }, []);

  const handleExpandPropertyCard = (id, isExpanded) => {
    if (['organization', 'connect'].includes(searchClasifier)) {
      isExpanded ? dispatch(viewLessPropertyOrganizationFlow(id)) : dispatch(viewMoreProperty(id));
      return;
    }
    isExpanded ? dispatch(viewLessProperty(id)) : dispatch(viewMoreProperty(id));
  };

  const handleExpandResidentialPropertyCard = (id, isExpanded) => {
    isExpanded ? dispatch(viewLessResidentialProperty(id)) : dispatch(viewMoreResidentialProperty(id));
  };

  const handleExpandOrganizationCard = (id, isExpanded) => {
    if (['organization', 'connect'].includes(searchClasifier)) {
      isExpanded ? dispatch(viewLessOrganizationConnectsFlow(id)) : dispatch(viewMoreOrganizationConnectsFlow(id));
    } else {
      isExpanded ? dispatch(viewLessOrganization(id)) : dispatch(viewMoreOrganization(id));
    }
  };

  const onDeleteCard = (resourceId, resourceName, cardType, unlockedFields, resourceType) => {
    dispatch(
      deleteResources({
        body: {
          payload: [
            {
              name: resourceName,
              resourceId: resourceId,
              resourceType,
              resourceSubType: cardType,
              unlockedFields,
            },
          ],
        },
      }),
    );
  };

  const onSaveCard = (resourceId, resourceName, cardType, unlockedFields, resourceType) => {
    dispatch(
      saveResources({
        body: {
          payload: [
            {
              name: resourceName,
              resourceId: resourceId,
              resourceType,
              resourceSubType: cardType,
              unlockedFields,
            },
          ],
        },
      }),
    );
  };

  const onSaveAllCard = (resourceData) => {
    dispatch(
      saveResources({
        body: {
          payload: resourceData,
        },
      }),
    );
  };

  const onDeleteAllCard = (resourceData) => {
    dispatch(
      deleteResources({
        body: {
          payload: resourceData,
        },
      }),
    );
  };

  const handleConnectsViewMore = (id) => {
    dispatch(viewMoreConnects(id));
  };

  const SEARCH_TYPE_VIEW = Object.freeze({
    Property: (
      <Property
        propertyData={propertyData}
        handleExpandPropertyCard={handleExpandPropertyCard}
        onSaveCard={onSaveCard}
        onDeleteCard={onDeleteCard}
        onSaveAllCard={onSaveAllCard}
        onDeleteAllCard={onDeleteAllCard}
      />
    ),
    ResidentialProperty: (
      <ResidentialProperty
        propertyData={residentialPropertyData}
        handleExpandPropertyCard={handleExpandResidentialPropertyCard}
        onSaveCard={onSaveCard}
        onDeleteCard={onDeleteCard}
        onSaveAllCard={onSaveAllCard}
        onDeleteAllCard={onDeleteAllCard}
      />
    ),
    ResidentialProperty: (
      <ResidentialProperty
        propertyData={residentialPropertyData}
        handleExpandPropertyCard={handleExpandResidentialPropertyCard}
        onSaveCard={onSaveCard}
        onDeleteCard={onDeleteCard}
        onSaveAllCard={onSaveAllCard}
        onDeleteAllCard={onDeleteAllCard}
      />
    ),
    Company: (
      <Organization
        organizationsData={organizationsData}
        handleExpandOrganizationCard={handleExpandOrganizationCard}
        onSaveCard={onSaveCard}
        onDeleteCard={onDeleteCard}
        onSaveAllCard={onSaveAllCard}
        onDeleteAllCard={onDeleteAllCard}
      />
    ),
    Connects: (
      <Contacts
        connectsData={connectsData}
        onSaveCard={onSaveCard}
        onDeleteCard={onDeleteCard}
        handleConnectsViewMore={handleConnectsViewMore}
        onSaveAllCard={onSaveAllCard}
        onDeleteAllCard={onDeleteAllCard}
      />
    ),
    Units: (
      <Units
        unitsData={unitsData}
        onSaveCard={onSaveCard}
        onDeleteCard={onDeleteCard}
        onSaveAllCard={onSaveAllCard}
        onDeleteAllCard={onDeleteAllCard}
      />
    ),
    Units: <Units unitsData={unitsData} onSaveCard={onSaveCard} onDeleteCard={onDeleteCard} />,
  });

  const loadMoreData = () => {
    dispatch(
      getSearchResults({
        body: {
          query: 'Blue Sky Apartment',
          offset: 1,
          limit: 15,
        },
      }),
    );
  };

  return (
    <>
      <Spin spinning={loading} fullscreen />

      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          gap: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: '80%', background: 'white', borderRadius: '8px', padding: '8px', overflowX: 'scroll' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '20px',
              gap: '14px',
              marginLeft: '20px',
            }}
          >
            {/* to be commented out later */}
            {/* <Tag
              color="#F0F0F0"
              style={{
                padding: '0px 50px 0px 50px',
                color: '#767676',
                height: '35px',
                borderRadius: '100px',
                verticalAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Text style={{ color: '#767676' }}>Filters &nbsp;(0 Applied)</Text>
            </Tag> */}
            <Switch
              checkedChildren="Commercial"
              unCheckedChildren="Residential"
              defaultChecked
              value={propertyToggle}
              onChange={() => {
                dispatch(setpropertyToggle(!propertyToggle));
                dispatch(reset_data());
              }}
            />
          </div>
          {propertyToggle && (
            <div style={{ width: '100%', borderRadius: '8px' }}>
              <div style={{ margin: '20px' }}>
                <Radio.Group
                  value={searchContext}
                  onChange={(e) => {
                    dispatch(setSearchContext(e?.target?.value));
                  }}
                >
                  <Radio.Button value="connect">Individual</Radio.Button>
                  <Radio.Button value="organization">Company</Radio.Button>
                  <Radio.Button value="commercialProperty">Property</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          )}
          <div style={{ width: '100%', borderRadius: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '10px' }}>
              {SEARCH_TYPE_VIEW[column1View]}
              {SEARCH_TYPE_VIEW[column2View]}
              {SEARCH_TYPE_VIEW[column3View]}
            </div>
          </div>
        </div>
        <div style={{ background: 'white', width: '20%', borderRadius: '8px' }}>
          <Wishlist wishlist={wishlist} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
