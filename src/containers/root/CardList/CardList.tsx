import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import * as R from 'ramda';
import React, { FC, useEffect, useState } from 'react';
import CardComponent from '../../../components/root/CardComponent';
import { API_VERSION } from '../../../constants';
import axios from '../../../http/backend/backend-axios';
import { User } from '../../../store/user/types';
import { Link } from './types';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export const CardList: FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [userMap, setUserMap] = useState<Map<string, User> | null>(null);
  const [channelMap, setChannelMap] = useState<Map<string, any> | null>(null);
  const [page] = useState(1);
  // const [date, setDate] = useState(yesterday);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`/${API_VERSION}/users`)
      .then((res) => {
        const newMap = new Map();
        res.data.users.map((user: any) => newMap.set(user.userId, user));
        setUserMap((_) => newMap);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/${API_VERSION}/channels`)
      .then((res) => {
        const newMap = new Map();
        res.data.channels.map((channel: any) => newMap.set(channel.channelId, channel));
        setChannelMap((_) => newMap);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get<{ links: Link[] }>(`/${API_VERSION}/links?page=${page}`)
      .then((res) => {
        setLinks((links) => [...links, ...res.data.links]);
      })
      .catch((e) => {
        alert(e);
      });
  }, [page]);

  return (
    <Container maxWidth='lg'>
      <Grid container className={classes.root} spacing={5} component={"div"}>
        {links && userMap && channelMap
          ? 
          (
            R.splitEvery(3, links)
              .map((links, outerIdx) => (
                links.map((link, innerIdx) => (
                  <Grid key={outerIdx * 3 + innerIdx} item xs={4}>
                    <CardComponent
                      user={userMap!.get(link.userId)!}
                      channel={channelMap!.get(link.channelId)!}
                      link={link}
                    />
                  </Grid>
                ))
              ))
          )
          : null}
      </Grid>
    </Container>
  );
};
