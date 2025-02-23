import Date from '@/components/common/date';
import Topics from '@/components/home/topics';
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

interface DataListProps {
  type: string;
  topics: string;
  date: string;
}

const DataList = ({ type, topics, date }: DataListProps) => {
  return (
    <ul className="mt-auto border border-b-0 border-l-0 border-r-0 border-slate-300 p-2">
      <li className="flex items-center space-x-2">
        <span>
          <CategoryIcon />
        </span>
        <span>{type}</span>
      </li>
      <li className="flex items-center space-x-2">
        <span>
          <TagIcon />
        </span>
        <Topics topicList={topics} />
      </li>
      <li className="flex items-center space-x-2">
        <span>
          <HistoryEduIcon />
        </span>
        <span>
          <Date dateString={date} />
        </span>
      </li>
    </ul>
  );
};

export default DataList;
