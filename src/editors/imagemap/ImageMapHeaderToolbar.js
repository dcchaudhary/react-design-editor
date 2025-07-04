import i18n from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';

import { CommonButton } from '../../components/common';
import { Flex } from '../../components/flex';
import Icon from '../../components/icon/Icon';
import ImageMapList from './ImageMapList';

class ImageMapHeaderToolbar extends React.Component {
	static propTypes = {
		canvasRef: PropTypes.any,
		selectedItem: PropTypes.object,
	};

	state = {
		showCanvasList: false,
	};

	toggleCanvasList = () => {
		this.setState(prevState => ({
			showCanvasList: !prevState.showCanvasList,
		}));
	};

	render() {
		const { canvasRef, selectedItem } = this.props;
		const { showCanvasList } = this.state;
		const isCropping = canvasRef ? canvasRef.handler?.interactionMode === 'crop' : false;
		return (
			<Flex className="rde-editor-header-toolbar-container" flex="1">
				<Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-list">
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						icon="layer-group"
						tooltipTitle={i18n.t('action.canvas-list')}
						onClick={this.toggleCanvasList}
					/>
					<div className={`rde-canvas-list ${showCanvasList ? 'show' : ''}`}>
						<ImageMapList canvasRef={canvasRef} selectedItem={selectedItem} />
					</div>
				</Flex.Item>
				<Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-alignment">
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.bringForward()}
						icon="angle-up"
						tooltipTitle={i18n.t('action.bring-forward')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.sendBackwards()}
						icon="angle-down"
						tooltipTitle={i18n.t('action.send-backwards')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.bringToFront()}
						icon="angle-double-up"
						tooltipTitle={i18n.t('action.bring-to-front')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.sendToBack()}
						icon="angle-double-down"
						tooltipTitle={i18n.t('action.send-to-back')}
					/>
				</Flex.Item>
				<Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-alignment">
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.alignmentHandler.left()}
						icon="align-left"
						tooltipTitle={i18n.t('action.align-left')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.alignmentHandler.center()}
						icon="align-center"
						tooltipTitle={i18n.t('action.align-center')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.alignmentHandler.middle()}
						icon="align-center"
						tooltipTitle={i18n.t('action.align-middle')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.alignmentHandler.right()}
						icon="align-right"
						tooltipTitle={i18n.t('action.align-right')}
					/>
				</Flex.Item>
				<Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-group">
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.toGroup()}
						icon="object-group"
						tooltipTitle={i18n.t('action.object-group')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.toActiveSelection()}
						icon="object-ungroup"
						tooltipTitle={i18n.t('action.object-ungroup')}
					/>
				</Flex.Item>
				<Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-crop">
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={canvasRef ? !canvasRef.handler?.cropHandler.validType() : true}
						onClick={() => canvasRef.handler?.cropHandler.start()}
						icon="crop"
						tooltipTitle={i18n.t('action.crop')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={canvasRef ? !canvasRef.handler?.cropHandler.cropRect : true}
						onClick={() => canvasRef.handler?.cropHandler.finish()}
						icon="check"
						tooltipTitle={i18n.t('action.crop-save')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={canvasRef ? !canvasRef.handler?.cropHandler.cropRect : true}
						onClick={() => canvasRef.handler?.cropHandler.cancel()}
						icon="times"
						tooltipTitle={i18n.t('action.crop-cancel')}
					/>
				</Flex.Item>
				<Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-operation">
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.saveImage()}
						icon="image"
						tooltipTitle={i18n.t('action.canvas-save')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.duplicate()}
						icon="clone"
						tooltipTitle={i18n.t('action.clone')}
					/>
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						disabled={isCropping}
						onClick={() => canvasRef.handler?.remove()}
						icon="trash"
						tooltipTitle={i18n.t('action.delete')}
					/>
				</Flex.Item>
				<Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-history">
					<CommonButton
						className="rde-action-btn"
						disabled={isCropping || (canvasRef && !canvasRef.handler?.transactionHandler.canUndo())}
						onClick={() => canvasRef.handler?.transactionHandler.undo()}
					>
						<Icon name="undo-alt" style={{ marginRight: 8 }} />
						Undo
					</CommonButton>
					<CommonButton
						className="rde-action-btn"
						disabled={isCropping || (canvasRef && !canvasRef.handler?.transactionHandler.canRedo())}
						onClick={() => canvasRef.handler?.transactionHandler.redo()}
					>
						Redo
						<Icon name="redo-alt" style={{ marginLeft: 8 }} />
					</CommonButton>
				</Flex.Item>
			</Flex>
		);
	}
}

export default ImageMapHeaderToolbar;
