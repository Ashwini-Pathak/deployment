import genericCard from '../../../../../assets/images/generic-card.png';
import newsCard from '../../../../../assets/images/news-card.png';
import reportCard from '../../../../../assets/images/report-card.png';
import jobCard from '../../../../../assets/images/job-card.png';
import leadCard from '../../../../../assets/images/lead-card.png';

export const createPostTypes = [
  { label: 'Generic Post', key: 'GENERIC_POST', icon: genericCard, enable: true },
  { label: 'News Card', key: 'NEWS_CARD', icon: newsCard, disabled: true },
  { label: 'Report Card', key: 'REPORT_CARD', icon: reportCard, disabled: true },
  { label: 'Ad Card', key: 'Ad_CARD', icon: leadCard, disabled: true },
  { label: 'Lead Card', key: 'LEAD_CARD', icon: leadCard, disabled: true },
  { label: 'Job Card', key: 'JOB_CARD', icon: jobCard, disabled: true },
  { label: 'Poll Card', key: 'POLL_CARD', icon: leadCard, disabled: true },
  { label: 'Event Card', key: 'EVENT_CARD', icon: leadCard, disabled: true },
];
