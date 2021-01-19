import React from 'react';
import { Switch, Route } from 'react-router-dom';

import YoutubeRegister from './youtube-register/youtube_register';
import YoutubeList from './youtube_list';
import YoutubeDetail from './youtube-detail/youtube_detail';

function YoutubeRouter() {
  console.log('라우터');

  return (
    <Switch>
      <Route path="/youtube_list/youtube_register" component={YoutubeRegister} />
      <Route path="/youtube_list/youtube_detail" component={YoutubeDetail} />
      <Route exact component={YoutubeList} />
    </Switch>
  );
}

export default YoutubeRouter;
