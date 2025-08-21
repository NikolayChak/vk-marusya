import {forwardRef, useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import {FaPlay, FaPause} from 'react-icons/fa'
import {animated, useSpring} from 'react-spring'

import './VideoModal.css'
import {CloseButton} from '@/components/ui'

interface VideoModalProps {
  url: string
  movieTitle: string
  closeVideo: () => void
}

const VideoModal = forwardRef<HTMLDivElement, VideoModalProps>(
  ({url, movieTitle, closeVideo}, ref) => {
    const [loading, setLoading] = useState(true)
    const [playing, setPlaying] = useState(false)
    const [userStopped, setUserStopped] = useState(false)
    const [isVisible, setVisible] = useState(false)

    const togglePlay = () => {
      setPlaying(!playing)
      setUserStopped(!playing)
    }

    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && !userStopped) {
          setPlaying(true)
        } else {
          setPlaying(false)
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }, [userStopped])

    const fadeAnimation = useSpring({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0px)' : 'translateY(10px)',
      config: {tension: 200, friction: 15},
    })

    return (
      <div className="backdrop-video" ref={ref}>
        <div
          className="player-wrapper"
          onClick={togglePlay}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <CloseButton onClick={closeVideo} name={'login'} fill={'black'} />

          {loading && <div className="loader-video" />}

          <ReactPlayer
            url={url}
            playing={playing}
            controls={false}
            width="100%"
            height="100%"
            onReady={() => {
              setLoading(false)
              if (!userStopped) setPlaying(true)
            }}
          />

          {!loading && isVisible && (
            <>
              <animated.button style={fadeAnimation} className="play-button">
                <div className="play-button__inner">
                  {playing ? <FaPause /> : <FaPlay />}
                </div>
              </animated.button>
              {!playing && (
                <animated.div style={fadeAnimation} className="movie-title">
                  {movieTitle}
                </animated.div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
)

export default VideoModal
