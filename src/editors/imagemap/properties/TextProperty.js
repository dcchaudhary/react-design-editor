import React from 'react';
import { Form, Slider, Col, Select, Tag, Row, Card, Typography } from 'antd';
import sortBy from 'lodash/sortBy';

import Icon from '../../../components/icon/Icon';
import Fonts from '../../../components/font/fonts';

const { Title } = Typography;
const fonts = Fonts.getFonts();

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		return (
			<React.Fragment>
				{/* Font Settings */}
				<Card size="small" style={{ marginBottom: 16 }}>
					<Title level={5} style={{ marginBottom: 12, fontSize: 14 }}>
						Font Settings
					</Title>
					<Row gutter={[12, 12]}>
						<Col span={24}>
							<Form.Item label="Font Family" colon={false}>
								{getFieldDecorator('fontFamily', {
									initialValue: data.fontFamily,
								})(
									<Select style={{ width: '100%' }}>
										{Object.keys(fonts).map(font => {
											return (
												<Select.OptGroup key={font} label={font.toUpperCase()}>
													{sortBy(fonts[font], ['name']).map(f => (
														<Select.Option key={f.name} value={f.name}>
															{f.name}
														</Select.Option>
													))}
												</Select.OptGroup>
											);
										})}
									</Select>,
								)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label="Font Size" colon={false}>
								{getFieldDecorator('fontSize', {
									initialValue: data.fontSize || '32',
								})(
									<Select>
										{Array.from({ length: 60 }, (v, k) => (
											<Select.Option key={k} value={`${k + 1}`}>
												{k + 1}
											</Select.Option>
										))}
									</Select>,
								)}
							</Form.Item>
						</Col>
					</Row>
				</Card>

				{/* Text Formatting */}
				<Card size="small" style={{ marginBottom: 16 }}>
					<Title level={5} style={{ marginBottom: 12, fontSize: 14 }}>
						Text Formatting
					</Title>
					<Row gutter={[8, 8]}>
						<Col span={6}>
							<Form.Item>
								{getFieldDecorator('fontWeight', {
									valuePropName: 'checked',
									initialValue: data.fontWeight === 'bold',
								})(
									<Tag.CheckableTag className="rde-action-tag" style={{ 
										width: '40px', 
										height: '40px', 
										borderRadius: '50%', 
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<Icon name="bold" />
									</Tag.CheckableTag>,
								)}
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item>
								{getFieldDecorator('fontStyle', {
									valuePropName: 'checked',
									initialValue: data.fontStyle === 'italic',
								})(
									<Tag.CheckableTag className="rde-action-tag" style={{ 
										width: '40px', 
										height: '40px', 
										borderRadius: '50%', 
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<Icon name="italic" />
									</Tag.CheckableTag>,
								)}
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item>
								{getFieldDecorator('linethrough', {
									valuePropName: 'checked',
									initialValue: data.linethrough,
								})(
									<Tag.CheckableTag className="rde-action-tag" style={{ 
										width: '40px', 
										height: '40px', 
										borderRadius: '50%', 
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<Icon name="strikethrough" />
									</Tag.CheckableTag>,
								)}
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item>
								{getFieldDecorator('underline', {
									valuePropName: 'checked',
									initialValue: data.underline,
								})(
									<Tag.CheckableTag className="rde-action-tag" style={{ 
										width: '40px', 
										height: '40px', 
										borderRadius: '50%', 
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<Icon name="underline" />
									</Tag.CheckableTag>,
								)}
							</Form.Item>
						</Col>
					</Row>
				</Card>

				{/* Text Alignment */}
				<Card size="small" style={{ marginBottom: 16 }}>
					<Title level={5} style={{ marginBottom: 12, fontSize: 14 }}>
						Text Alignment
					</Title>
					<Row gutter={[8, 8]}>
						<Col span={6}>
							<Form.Item>
								{getFieldDecorator('textAlign.left', {
									valuePropName: 'checked',
									initialValue: data.textAlign === 'left',
								})(
									<Tag.CheckableTag className="rde-action-tag" style={{ 
										width: '40px', 
										height: '40px', 
										borderRadius: '50%', 
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<Icon name="align-left" />
									</Tag.CheckableTag>,
								)}
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item>
								{getFieldDecorator('textAlign.center', {
									valuePropName: 'checked',
									initialValue: data.textAlign === 'center',
								})(
									<Tag.CheckableTag className="rde-action-tag" style={{ 
										width: '40px', 
										height: '40px', 
										borderRadius: '50%', 
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<Icon name="align-center" />
									</Tag.CheckableTag>,
								)}
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item>
								{getFieldDecorator('textAlign.right', {
									valuePropName: 'checked',
									initialValue: data.textAlign === 'right',
								})(
									<Tag.CheckableTag className="rde-action-tag" style={{ 
										width: '40px', 
										height: '40px', 
										borderRadius: '50%', 
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<Icon name="align-right" />
									</Tag.CheckableTag>,
								)}
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item>
								{getFieldDecorator('textAlign.justify', {
									valuePropName: 'checked',
									initialValue: data.textAlign === 'justify',
								})(
									<Tag.CheckableTag className="rde-action-tag" style={{ 
										width: '40px', 
										height: '40px', 
										borderRadius: '50%', 
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}>
										<Icon name="align-justify" />
									</Tag.CheckableTag>,
								)}
							</Form.Item>
						</Col>
					</Row>
				</Card>

				{/* Text Spacing */}
				<Card size="small">
					<Title level={5} style={{ marginBottom: 12, fontSize: 14 }}>
						Text Spacing
					</Title>
					<Row gutter={[12, 12]}>
						<Col span={24}>
							<Form.Item label="Line Height" colon={false}>
								{getFieldDecorator('lineHeight', {
									rules: [
										{
											type: 'number',
										},
									],
									initialValue: data.lineHeight,
								})(<Slider min={0.5} max={3} step={0.1} />)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label="Char Spacing" colon={false}>
								{getFieldDecorator('charSpacing', {
									rules: [
										{
											type: 'number',
										},
									],
									initialValue: data.charSpacing,
								})(<Slider min={0} max={100} />)}
							</Form.Item>
						</Col>
					</Row>
				</Card>
			</React.Fragment>
		);
	},
};
