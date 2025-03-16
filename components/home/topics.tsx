/*
トピックをspan要素で展開
例：LPIC Linux 初心者 資格
*/

interface TopicsProps {
  topicList: string[];
}

const Topics = ({ topicList }: TopicsProps) => {
  return (
    <>
      {topicList.map((topic, index) => (
        <span key={topic}>
          {topic}
          {index !== topicList.length - 1 && ','}
        </span>
      ))}
    </>
  );
};

export default Topics;
