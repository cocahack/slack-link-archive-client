export type Link = {
  url: string;
  channelId: string;
  userId: string
  date: string;
  linkTimestamp: string;
  message?: Message;
  metadata?: LinkMetaData;
};

type Message = {
  messageId: string;
  text: string;
}

type LinkMetaData = {
  imageUrl: string;
  serviceIcon: string;
  serviceName: string;
  text: string;
  title: string;
}
