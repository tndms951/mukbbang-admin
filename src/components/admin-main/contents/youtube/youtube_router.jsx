import React from 'react';
import { Switch, Route } from 'react-router-dom';

import YoutubeRegister from './youtube-register/youtube_register';
import YoutubeList from './youtube_list';
import YoutubeDetail from './youtube-detail/youtube_detail';

function YoutubeRouter({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}/youtube_register`} component={YoutubeRegister} />
      <Route path={`${match.path}/youtube_detail/:youtubeId`} component={YoutubeDetail} />
      <Route exact path={match.path} component={YoutubeList} />
    </Switch>
  );
}

export default YoutubeRouter;
