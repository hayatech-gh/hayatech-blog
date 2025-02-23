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
      {topicList.map((topic) => (
        <span className="mr-1" key={topic}>
          {topic}
        </span>
      ))}
    </>
  );
};

export default Topics;
