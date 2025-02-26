import React, { useState } from 'react';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { downloadFileUrl } from '@app/helpers/helperFunctions';
import { IImage } from '@app/types/types';

interface IProps {
  backdrop: IImage;
}

const BackdropCard: React.FC<IProps> = ({ backdrop }) => {
  const [isDownloading, setIfDownloading] = useState(false);
  const { file_path } = backdrop;
  const tmdbPosterPath = 'https://caps1cdn.adultempire.com/o/1920/1080/';
  const tmdbPosterBase = 'https://caps1cdn.adultempire.com/o/1920/1080';

  const download = () => {
    setIfDownloading(true);

    downloadFileUrl(`${tmdbPosterBase + file_path}`)
      .then(() => setIfDownloading(false))
      .catch((e) => {
        setIfDownloading(false);
        console.log(e);
      });
  };

  return (
    <div className="card backdrop__card">
      <div className="card__image">
        <LazyLoad
          debounce={false}
          offsetVertical={500}
        >
          <ImageLoader
            src={file_path ? `${tmdbPosterPath + file_path}` : '/images/img-placeholder.jpg'}
          />
        </LazyLoad>
      </div>
      <div className="card__details poster__details">
        <button
          className="button--muted poster__download"
          disabled={isDownloading}
          onClick={download}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
          <i className="fa fa-download" />
        </button>
      </div>
    </div>
  );
};

export default BackdropCard;
