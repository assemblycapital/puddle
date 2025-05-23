import React, {useRef, useState, useEffect, useCallback} from 'react';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import Split from 'react-split';
import './ChatBox.css';
import ProfilePicture from './ProfilePicture';
import DisplayUserActivity from './DisplayUserActivity';
import useServiceStore, { ChatMessage, ChatState } from '../store/service';
import { dfLinkRegex, dfLinkToRealLink, getPeerNameColor, nodeProfileLink } from '..';
import { isImageUrl, formatTimestamp, linkRegex } from '../utils';

interface ChatBoxProps {
  chatState: ChatState;
}

const SplitComponent = Split as unknown as React.FC<any>;

const ChatBox: React.FC<ChatBoxProps> = ({ chatState }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatInputRef = useRef<HTMLDivElement | null>(null);
  const [inputHeight, setInputHeight] = useState(0);
  const [chatMessageList, setChatMessageList] = useState<Array<ChatMessage>>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const chatboxRef = useRef<HTMLDivElement | null>(null);
  const [unseenMessagesCount, setUnseenMessagesCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  const {peerMap, chatSoundsEnabled} = useServiceStore();

  useEffect(() => {
    const updateInputHeight = () => {
      if (chatInputRef.current) {
        setInputHeight(chatInputRef.current.offsetHeight + 6);
      }
    };
    updateInputHeight();
  }, []);

  useEffect(() => {
    if (chatState.messages.size === 0) return;
    if (!(chatState.messages instanceof Map)) {
      return;
    }

    const sortedMessages = Array.from(chatState.messages.values()).sort((a, b) => (a as ChatMessage).id - (b as ChatMessage).id);
    setChatMessageList(sortedMessages as ChatMessage[]);
    scrollDownChat();

  }, [chatState.messages]);

  const scrollDownChat = useCallback(() => {
    if (messagesEndRef.current && !showButton) {
      let behavior = "auto";
      // if (chatState.lastUpdateType === "message") {
      //   behavior = "smooth";
      // }
      messagesEndRef.current.scrollIntoView({ behavior: behavior as ScrollBehavior, block: 'nearest', inline: 'start' });
    } else {
        setUnseenMessagesCount(prevCount => prevCount + 1)
    }
  }, [messagesEndRef, chatState.lastUpdateType, showButton, setUnseenMessagesCount]);

  useEffect(()=>{
    if (!isScrolledUp) {
      setUnseenMessagesCount(0);
    }
  }, [isScrolledUp])

  useEffect(() => {
    if (!isScrolledUp) {
      scrollDownChat();
    }
  }, [chatMessageList, scrollDownChat, isScrolledUp]);

  const baseOrigin = window.origin.split(".").slice(1).join(".")
  const getMessageInnerText = useCallback(
    (message: string) => {
      if (isImageUrl(message)) {
        return (
          <img
            src={message}
            alt="chat image"
            style={{
              height: "100%",
              maxHeight: "9rem",
              objectFit: "cover",
              maxWidth: "100%",
            }}
            onLoad={scrollDownChat}
          />
        );
      } else if (linkRegex.test(message)) {
        return (
          <span>
            <a
              className="link puddle"
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              href={message}
            >
              {message}
            </a>
          </span>
        );
      } else if (dfLinkRegex.test(message)) {
        const realLink = dfLinkToRealLink(message, baseOrigin)
        return (
          <span>
            <a
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              href={realLink}
              className="link puddle"
            >
              {message}
            </a>
          </span>
        );

      } else {
        return <span>{message.replace(/\s+/g, ' ')}</span>;
      }
    },
    [scrollDownChat]
  );

  const handleScroll = useCallback(() => {
    if (chatboxRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatboxRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsScrolledUp(!isScrolledToBottom);

      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }

      if (!isScrolledToBottom) {
        scrollTimer.current = setTimeout(() => {
          setShowButton(true);
        }, 500);
      } else {
        setShowButton(false);
      }
    }
  }, []);

  useEffect(() => {
    const chatbox = chatboxRef.current;
    if (chatbox) {
      chatbox.addEventListener('scroll', handleScroll);
      return () => {
        chatbox.removeEventListener('scroll', handleScroll);
        if (scrollTimer.current) {
          clearTimeout(scrollTimer.current);
        }
      };
    }
  }, [handleScroll]);

  const jumpToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
    setIsScrolledUp(false);
    setShowButton(false);
    setUnseenMessagesCount(0);
  };

  return (
    <div
    style={{
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      maxHeight: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
      lineHeight: 1.5,
      fontWeight: 400,
      colorScheme: "dark",
      color: "#d1d1d1",
      backgroundColor: "#242424",
      fontSynthesis: "none",
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    }}
    >
      <div>
        <ChatHeader />
      </div>

      <div
        style={{
          flexGrow:"1",
          height:"100%",
          maxHeight:"100%",
          overflow:"hidden",
        }}
      >
        <SplitComponent
          sizes={[95, 5]}
          minSize={45}
          direction="vertical"
          style={{
            flexGrow:"1",
            height:"100%",
            maxHeight:"100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            ref={chatboxRef}
            style={{
              overflowY: "scroll",
              width:"100%",
              maxWidth:"100%",
              height:"100%",
              maxHeight:"100%",
              position: "relative",
            }}
            onScroll={handleScroll}
          >
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                flexDirection:"column",
                overflowY:"auto",
                paddingTop:"0.8rem",
                width: "100%",
                justifyContent: "flex-end",
                minHeight: "100%",
              }}
            >
              {chatMessageList.map((message, index) => (
                <div key={index}
                  className='chat-message'
                  style={{
                    display:"flex",
                    flexDirection:"row",
                    width:"100%",
                    gap:"0.8rem",
                    padding: "10px 0rem",
                    paddingRight: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      userSelect:"none",
                      paddingLeft: "10px",
                      flexShrink: 0,
                    }}
                  >
                    <a
                      href={nodeProfileLink(message.from, baseOrigin)}
                      className="df"
                    >
                    <ProfilePicture size="40px" node={message.from} />
                    </a>
                  </div>
                  <div
                    style={{
                      display:"flex",
                      flexDirection:"column",
                      width:"100%",
                      gap: "3px",
                      minWidth: 0,
                      maxWidth: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <div style={{ verticalAlign: "top",  lineHeight: "0.9" }}>
                      <a style={{ display: "inline-block", marginRight: "8px", cursor: "pointer", fontSize: "0.9rem" }}
                        className={`${getPeerNameColor(peerMap.get(message.from))} puddle`}
                        href={nodeProfileLink(message.from, baseOrigin)}
                      >
                        <span>{message.from}:</span>
                      </a>
                      <div style={{ userSelect: "none", color: "#ffffff77", fontSize: "0.7rem", display: "inline-block", marginRight: "5px", cursor: "default" }}>
                        <span>{formatTimestamp(message.time)}</span>
                      </div>
                    </div>
                    <span style={{ 
                      fontSize: "0.9rem", 
                      cursor: "default", 
                      wordWrap: "break-word", 
                      overflowWrap: "break-word", 
                      whiteSpace: "pre-wrap",
                      maxWidth: "100%",
                    }}>
                      {getMessageInnerText(message.msg)}
                    </span>
                  </div>
                </div>
              ))}
              <div id="messages-end-ref" ref={messagesEndRef} style={{ display: "inline" }} />
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            {showButton && (
              <button
                onClick={jumpToBottom}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '4px',
                  padding: '8px 12px',
                  backgroundColor: '#4a4a4a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  zIndex: 1000,
                }}
              >
                {unseenMessagesCount > 0 ? `${unseenMessagesCount} unseen` : 'latest'}
              </button>
            )}
            <div
              ref={chatInputRef}
              style={{
                width: "100%",
                maxWidth: "100%",
                height: "100%",
              }}
            >
              <ChatInput />
            </div>
          </div>
        </SplitComponent>
      </div>
    </div>
  );
};

export default React.memo(ChatBox);