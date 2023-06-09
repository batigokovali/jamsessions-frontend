import React from "react";
import { IFeeds } from "../../../Types/IFeeds";
import Modal from "react-bootstrap/Modal";
import cx from "classnames";
import styles from "./styles.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItem: IFeeds | null;
  playing: boolean;
  handlePlay: () => void;
  handlePause: () => void;
}

export const MediaModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  mediaItem,
  playing,
  handlePlay,
  handlePause,
}) => {
  if (!isOpen) return null;
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header className="bg-dark d-flex flex-column align-items-start">
        <p className="text-white">{mediaItem?.title}</p>
        <p className="text-white">{mediaItem?.description}</p>
      </Modal.Header>
      <Modal.Body className="bg-dark rounded">
        <video
          controls
          className={cx(styles.video)}
          onPlay={handlePlay}
          onPause={handlePause}
        >
          <source src={mediaItem?.media} type="video/mp4" />
        </video>
      </Modal.Body>
    </Modal>
  );
};
