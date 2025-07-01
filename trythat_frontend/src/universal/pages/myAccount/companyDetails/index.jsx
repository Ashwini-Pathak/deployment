import { Card } from 'antd';
import './index.scss';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userOnboardingGetCompany, userOnboardingGetCompanyFollowStats } from '../../../features/userOnboardingSlice';
import PostDetails from '../PostDetails/PostDetails';
import AboutCompany from './AboutCompany';
import Organization from './Organization';

const CompanyDetailsTab = ({ activeTab, activeAccountTab }) => {
  // States
  const [companyData, setCompanyData] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [stats, setStats] = useState(null);

  // hooks
  const dispatch = useDispatch();

  // Fetch Data
  useEffect(() => {
    dispatch(userOnboardingGetCompany())?.then((res) => {
      const data = res?.payload.data?.response?.data;
      if (data) {
        setIndustry(data?.industryDetails?.name);
        setCompanyData(data);
        // dispatch(userOnboardingGetIndustryDetails(data?.id))?.then((res) => {
        //   const data = res?.payload.data?.response?.data;
        //   setIndustry(data);
        // });
      }
    });
    dispatch(userOnboardingGetCompanyFollowStats())?.then((res) => {
      const data = res?.payload.data?.response?.data;
      if (data) {
        setStats(data);
      }
    });
  }, [activeTab]);

  return (
    <>
      <section className="personalDtlsSection">
        <Card className="personalDtlsSection-form__card">
          <Organization industry={industry} stats={stats} companyData={companyData} />
        </Card>

        <Card className="personalDtlsSection-form__card">
          <AboutCompany companyData={companyData} />
        </Card>

        <Card className="personalDtlsSection-form__cardtwo">
          <PostDetails companyData={companyData} activeAccountTab={activeAccountTab} />
        </Card>
        {/* </Form> */}
      </section>
    </>
  );
};

export default CompanyDetailsTab;
