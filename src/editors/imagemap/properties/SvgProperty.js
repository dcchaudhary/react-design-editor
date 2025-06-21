import { Form, Radio, Input } from 'antd';
import i18n from 'i18next';
import React, { Component } from 'react';

import FileUpload from '../../../components/common/FileUpload';

const { TextArea } = Input;

class SvgProperty extends Component {
	state = {
		loadType: 'file',
	};

	componentDidMount() {
		const { data } = this.props;
		if (data && data.loadType) {
			this.setState({ loadType: data.loadType });
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { data } = nextProps;
		if (data && data.loadType && data.loadType !== this.state.loadType) {
			this.setState({ loadType: data.loadType });
		}
	}

	handleChangeSvgType = (e) => {
		this.setState({ loadType: e.target.value });
	};

	render() {
		const { form, data } = this.props;
		const { loadType } = this.state;
		
		if (!data) {
			return null;
		}
		
		return (
			<React.Fragment>
				<Form.Item label={i18n.t('common.type')}>
					{form.getFieldDecorator('loadType', {
						initialValue: loadType,
					})(
						<Radio.Group onChange={this.handleChangeSvgType}>
							<Radio.Button value="file">{i18n.t('common.file')}</Radio.Button>
							<Radio.Button value="svg">{i18n.t('common.svg')}</Radio.Button>
						</Radio.Group>,
					)}
				</Form.Item>
				<Form.Item label={loadType === 'svg' ? i18n.t('common.svg') : i18n.t('common.file')}>
					{form.getFieldDecorator('src', {
						rules: [
							{
								required: true,
								message: i18n.t('validation.enter-property', {
									arg: loadType === 'svg' ? i18n.t('common.svg') : i18n.t('common.file'),
								}),
							},
						],
					})(loadType === 'svg' ? 
						<TextArea 
							rows={8} 
							placeholder="Enter SVG code here..."
							style={{ fontFamily: 'monospace' }}
						/> : 
						<FileUpload accept=".svg" />
					)}
				</Form.Item>
			</React.Fragment>
		);
	}
}

export default {
	render(canvasRef, form, data) {
		return <SvgProperty form={form} data={data} />;
	},
};
