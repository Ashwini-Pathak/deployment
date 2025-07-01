import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailedPropertyInfo, getDetailedResidentialPropertyInfo } from '../../features/searchSlice';
import ResidentialPropertyDetailsCard from '../residentialPropertyDetailsCard/ResidentialPropertyDetailsCard';
import CommercialPropertyDetailsCard from '../commercialPropertyDetailsCard/CommercialPropertyDetailsCard';

import { isEmpty } from 'lodash';
import './PropertyDetailsCard.scss';

const PropertyDetailsCard = ({}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { detailedPropertyData, propertyToggle } = useSelector((store) => store.search);

  const [propertyDetails, setPropertyDetails] = useState({});

  useEffect(() => {
    if (propertyToggle) {
      dispatch(getDetailedPropertyInfo(id));
      return;
    }
    dispatch(getDetailedResidentialPropertyInfo(id));
  }, []);

  useEffect(() => {
    if (isEmpty(detailedPropertyData)) return;
    setPropertyDetails(detailedPropertyData);
  }, [detailedPropertyData]);

  return (
    <Fragment>
      {propertyToggle ? <CommercialPropertyDetailsCard id={id} /> : <ResidentialPropertyDetailsCard id={id} />}
    </Fragment>
  );
};

export default PropertyDetailsCard;
