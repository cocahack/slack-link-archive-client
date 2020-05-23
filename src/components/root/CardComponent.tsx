import { Avatar, CardActions, Collapse, IconButton, Link as MaterialLink } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React, { FC } from 'react';
import { Link } from '../../containers/root/CardList/types';
import './Card.css';

type User = {
  userName: string,
  userImage?: string,
}

type Channel = {
  channelName: string,
}

type Props = {
  link: Link,
  user: User,
  channel: Channel,
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CardComponent: FC<Props> = ({ link, user, channel }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card elevation={10} className={classes.root}>
      <CardHeader
        avatar={
          user.userImage ?
          <Avatar aria-label="user-avatar" src={user.userImage.replace('original', '24')} className={classes.avatar} />
          :
          <Avatar aria-label="user-avatar" className={classes.avatar}>
            {user.userName[0]}
          </Avatar>
        }
        title={
          <MaterialLink href={link.url} target="_blank">
            {link.metadata?.title || '일반 링크'}
          </MaterialLink>
        }
        subheader={new Date(link.date).toLocaleDateString('ko-KR')}
      />
      <CardMedia
        className={classes.media}
        image={ link.metadata?.imageUrl ? link.metadata.imageUrl : "placeholder.jpg"}
      />
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {link.metadata?.text}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CardComponent;
