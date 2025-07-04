import { Button, Switch, Tooltip } from 'antd';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { code } from '../../canvas/constants';
import CommonButton from '../../components/common/CommonButton';

class ImageMapFooterToolbar extends Component {
	static propTypes = {
		canvasRef: PropTypes.any,
		preview: PropTypes.bool,
		onChangePreview: PropTypes.func,
		zoomRatio: PropTypes.number,
	};

	state = {
		interactionMode: 'selection',
	};

	componentDidMount() {
		const { canvasRef } = this.props;
		this.waitForCanvasRender(canvasRef);
	}

	componentWillUnmount() {
		const { canvasRef } = this.props;
		this.detachEventListener(canvasRef);
	}

	waitForCanvasRender = canvas => {
		setTimeout(() => {
			if (canvas) {
				this.attachEventListener(canvas);
				return;
			}
			const { canvasRef } = this.props;
			this.waitForCanvasRender(canvasRef);
		}, 5);
	};

	attachEventListener = canvasRef => {
		canvasRef.canvas.wrapperEl.addEventListener('keydown', this.events.keydown, false);
	};

	detachEventListener = canvasRef => {
		canvasRef.canvas.wrapperEl.removeEventListener('keydown', this.events.keydown);
	};

	/* eslint-disable react/sort-comp, react/prop-types */
	handlers = {
		selection: () => {
			if (this.props.canvasRef.handler.interactionHandler.isDrawingMode()) {
				return;
			}
			this.forceUpdate();
			this.props.canvasRef.handler.interactionHandler.selection();
			this.setState({ interactionMode: 'selection' });
		},
		grab: () => {
			if (this.props.canvasRef.handler.interactionHandler.isDrawingMode()) {
				return;
			}
			this.forceUpdate();
			this.props.canvasRef.handler.interactionHandler.grab();
			this.setState({ interactionMode: 'grab' });
		},
	};

	events = {
		keydown: e => {
			if (this.props.canvasRef.canvas.wrapperEl !== document.activeElement) {
				return false;
			}
			if (e.code === code.KEY_Q) {
				this.handlers.selection();
			} else if (e.code === code.KEY_W) {
				this.handlers.grab();
			}
		},
	};

	render() {
		const { canvasRef, preview, zoomRatio, onChangePreview } = this.props;
		const { interactionMode } = this.state;
		const { selection, grab } = this.handlers;
		if (!canvasRef) {
			return null;
		}
		const zoomValue = parseInt((zoomRatio * 100).toFixed(2), 10);
		return (
			<React.Fragment>
				<div className="rde-editor-footer-toolbar-interaction">
					<Button.Group>
						<CommonButton
							type={interactionMode === 'selection' ? 'primary' : 'default'}
							style={{ borderBottomLeftRadius: '8px', borderTopLeftRadius: '8px' }}
							onClick={() => {
								selection();
							}}
							icon="mouse-pointer"
							tooltipTitle={i18n.t('action.selection')}
						/>
						<CommonButton
							type={interactionMode === 'grab' ? 'primary' : 'default'}
							style={{ borderBottomRightRadius: '8px', borderTopRightRadius: '8px' }}
							onClick={() => {
								grab();
							}}
							tooltipTitle={i18n.t('action.grab')}
							icon="hand-rock"
						/>
					</Button.Group>
				</div>
				<div className="rde-editor-footer-toolbar-zoom">
					<Button.Group>
						<CommonButton
							style={{ borderBottomLeftRadius: '8px', borderTopLeftRadius: '8px' }}
							onClick={() => {
								canvasRef.handler.zoomHandler.zoomOut();
							}}
							icon="search-minus"
							tooltipTitle={i18n.t('action.zoom-out')}
						/>
						<CommonButton
							onClick={() => {
								canvasRef.handler.zoomHandler.zoomOneToOne();
							}}
							tooltipTitle={i18n.t('action.one-to-one')}
						>
							{`${zoomValue}%`}
						</CommonButton>
						<CommonButton
							onClick={() => {
								canvasRef.handler.zoomHandler.zoomToFit();
							}}
							tooltipTitle={i18n.t('action.fit')}
							icon="expand"
						/>
						<CommonButton
							style={{ borderBottomRightRadius: '8px', borderTopRightRadius: '8px' }}
							onClick={() => {
								canvasRef.handler.zoomHandler.zoomIn();
							}}
							icon="search-plus"
							tooltipTitle={i18n.t('action.zoom-in')}
						/>
					</Button.Group>
				</div>
				<div className="rde-editor-footer-toolbar-preview">
					<Tooltip title={i18n.t('action.preview')}>
						<Switch checked={preview} onChange={onChangePreview} />
					</Tooltip>
				</div>
			</React.Fragment>
		);
	}
}

export default ImageMapFooterToolbar;
