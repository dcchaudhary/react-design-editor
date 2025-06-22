import React from 'react';
import { Row, Col, Form, Switch, Slider, Card, Divider, Typography } from 'antd';
import i18n from 'i18next';
import Icon from '../../../components/icon/Icon';

const { Title } = Typography;

// Simple Drop Shadow Component
const DropShadowComponent = ({ canvasRef }) => {
    const [enabled, setEnabled] = React.useState(false);
    const [offsetX, setOffsetX] = React.useState(5);
    const [offsetY, setOffsetY] = React.useState(5);
    const [blur, setBlur] = React.useState(5);
    const [color, setColor] = React.useState('#000000');

    const applyShadow = (isEnabled, shadowValues = {}) => {
        if (canvasRef && canvasRef.handler) {
            const obj = canvasRef.handler.canvas.getActiveObject();
            if (obj) {
                if (isEnabled) {
                    obj.set('shadow', {
                        offsetX: shadowValues.offsetX || offsetX,
                        offsetY: shadowValues.offsetY || offsetY,
                        blur: shadowValues.blur || blur,
                        color: shadowValues.color || color
                    });
                } else {
                    obj.set('shadow', null);
                }
                canvasRef.handler.canvas.requestRenderAll();
            }
        }
    };

    const handleSwitchChange = (checked) => {
        setEnabled(checked);
        applyShadow(checked);
    };

    const handleSliderChange = (value, type) => {
        if (type === 'offsetX') setOffsetX(value);
        if (type === 'offsetY') setOffsetY(value);
        if (type === 'blur') setBlur(value);
        
        if (enabled) {
            applyShadow(true, {
                offsetX: type === 'offsetX' ? value : offsetX,
                offsetY: type === 'offsetY' ? value : offsetY,
                blur: type === 'blur' ? value : blur,
                color: color
            });
        }
    };

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setColor(newColor);
        
        if (enabled) {
            applyShadow(true, {
                offsetX: offsetX,
                offsetY: offsetY,
                blur: blur,
                color: newColor
            });
        }
    };

    return (
        <Card size="small" style={{ marginBottom: 16 }}>
            <Title level={5} style={{ marginBottom: 12, fontSize: 14 }}>
                Drop Shadow
            </Title>
            <div className="filter-header">
                <Icon name="cloud" className="filter-icon" />
                <span className="filter-label">
                    Drop Shadow
                </span>
                <Switch 
                    size="small" 
                    checked={enabled}
                    onChange={handleSwitchChange}
                />
            </div>
            
            {/* Horizontal Offset */}
            <div className="filter-slider" style={{ marginTop: 8 }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 4
                }}>
                    <span style={{ fontSize: '12px', color: enabled ? '#666' : '#ccc' }}>
                        Horizontal Offset
                    </span>
                    <span style={{ fontSize: '11px', color: enabled ? '#999' : '#ccc' }}>
                        {offsetX}
                    </span>
                </div>
                <div style={{ padding: '0 8px' }}>
                    <Slider
                        disabled={!enabled}
                        min={-100}
                        max={100}
                        step={1}
                        value={offsetX}
                        onChange={(value) => handleSliderChange(value, 'offsetX')}
                    />
                </div>
            </div>
            
            {/* Vertical Offset */}
            <div className="filter-slider" style={{ marginTop: 8 }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 4
                }}>
                    <span style={{ fontSize: '12px', color: enabled ? '#666' : '#ccc' }}>
                        Vertical Offset
                    </span>
                    <span style={{ fontSize: '11px', color: enabled ? '#999' : '#ccc' }}>
                        {offsetY}
                    </span>
                </div>
                <div style={{ padding: '0 8px' }}>
                    <Slider
                        disabled={!enabled}
                        min={-100}
                        max={100}
                        step={1}
                        value={offsetY}
                        onChange={(value) => handleSliderChange(value, 'offsetY')}
                    />
                </div>
            </div>
            
            {/* Blur Radius */}
            <div className="filter-slider" style={{ marginTop: 8 }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 4
                }}>
                    <span style={{ fontSize: '12px', color: enabled ? '#666' : '#ccc' }}>
                        Blur Radius
                    </span>
                    <span style={{ fontSize: '11px', color: enabled ? '#999' : '#ccc' }}>
                        {blur}
                    </span>
                </div>
                <div style={{ padding: '0 8px' }}>
                    <Slider
                        disabled={!enabled}
                        min={0}
                        max={100}
                        step={1}
                        value={blur}
                        onChange={(value) => handleSliderChange(value, 'blur')}
                    />
                </div>
            </div>
            
            {/* Shadow Color */}
            <div className="filter-slider" style={{ marginTop: 8 }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 4
                }}>
                    <span style={{ fontSize: '12px', color: enabled ? '#666' : '#ccc' }}>
                        Shadow Color
                    </span>
                    <div style={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: 3, 
                        border: '1px solid #d9d9d9',
                        opacity: enabled ? 1 : 0.5
                    }}>
                        <input 
                            type="color" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                border: 'none', 
                                borderRadius: 2,
                                cursor: enabled ? 'pointer' : 'not-allowed',
                                opacity: enabled ? 1 : 0.5
                            }}
                            value={color}
                            onChange={handleColorChange}
                            disabled={!enabled}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default {
    render(canvasRef, form, data) {
        const { getFieldDecorator } = form;
        const { filters } = data;

        const filterConfigs = [
            {
                key: 'grayscale',
                label: i18n.t('imagemap.filter.grayscale'),
                icon: 'adjust',
                index: 0,
                type: 'toggle',
                category: 'color'
            },
            {
                key: 'invert',
                label: i18n.t('imagemap.filter.invert'),
                icon: 'exchange-alt',
                index: 1,
                type: 'toggle',
                category: 'color'
            },
            {
                key: 'sepia',
                label: i18n.t('imagemap.filter.sepia'),
                icon: 'image',
                index: 3,
                type: 'toggle',
                category: 'vintage'
            },
            {
                key: 'brownie',
                label: i18n.t('imagemap.filter.brownie'),
                icon: 'coffee',
                index: 4,
                type: 'toggle',
                category: 'vintage'
            },
            {
                key: 'vintage',
                label: i18n.t('imagemap.filter.vintage'),
                icon: 'camera-retro',
                index: 9,
                type: 'toggle',
                category: 'vintage'
            },
            {
                key: 'blackwhite',
                label: i18n.t('imagemap.filter.blackwhite'),
                icon: 'circle',
                index: 19,
                type: 'toggle',
                category: 'color'
            },
            {
                key: 'technicolor',
                label: i18n.t('imagemap.filter.technicolor'),
                icon: 'palette',
                index: 14,
                type: 'toggle',
                category: 'color'
            },
            {
                key: 'polaroid',
                label: i18n.t('imagemap.filter.polaroid'),
                icon: 'camera',
                index: 15,
                type: 'toggle',
                category: 'vintage'
            },
            {
                key: 'sharpen',
                label: i18n.t('imagemap.filter.sharpen'),
                icon: 'cut',
                index: 12,
                type: 'toggle',
                category: 'enhancement'
            },
            {
                key: 'emboss',
                label: i18n.t('imagemap.filter.emboss'),
                icon: 'mountain',
                index: 13,
                type: 'toggle',
                category: 'enhancement'
            }
        ];

        const sliderConfigs = [
            {
                key: 'brightness',
                label: i18n.t('imagemap.filter.brightness'),
                icon: 'sun',
                index: 5,
                field: 'brightness',
                min: -1,
                max: 1,
                step: 0.01,
                defaultValue: 0.1
            },
            {
                key: 'contrast',
                label: i18n.t('imagemap.filter.contrast'),
                icon: 'adjust',
                index: 6,
                field: 'contrast',
                min: -1,
                max: 1,
                step: 0.01,
                defaultValue: 0
            },
            {
                key: 'saturation',
                label: i18n.t('imagemap.filter.saturation'),
                icon: 'tint',
                index: 7,
                field: 'saturation',
                min: -1,
                max: 1,
                step: 0.01,
                defaultValue: 0
            },
            {
                key: 'hue',
                label: i18n.t('imagemap.filter.hue'),
                icon: 'palette',
                index: 21,
                field: 'rotation',
                min: -2,
                max: 2,
                step: 0.002,
                defaultValue: 0
            },
            {
                key: 'noise',
                label: i18n.t('imagemap.filter.noise'),
                icon: 'random',
                index: 8,
                field: 'noise',
                min: 0,
                max: 1000,
                step: 1,
                defaultValue: 100
            },
            {
                key: 'pixelate',
                label: i18n.t('imagemap.filter.pixelate'),
                icon: 'th-large',
                index: 10,
                field: 'blocksize',
                min: 2,
                max: 20,
                step: 1,
                defaultValue: 4
            },
            {
                key: 'blur',
                label: i18n.t('imagemap.filter.blur'),
                icon: 'eye-slash',
                index: 11,
                field: 'value',
                min: 0,
                max: 3,
                step: 0.1,
                defaultValue: 0
            }
        ];

        const gammaConfig = {
            key: 'gamma',
            label: i18n.t('imagemap.filter.gamma'),
            icon: 'sliders-h',
            index: 17,
            fields: ['r', 'g', 'b'],
            labels: [i18n.t('color.red'), i18n.t('color.green'), i18n.t('color.blue')],
            min: 0.01,
            max: 2.2,
            step: 0.01,
            defaultValue: 1
        };

        return (
            <div className="rde-filter-container" style={{ padding: '16px 0' }}>
                <div className="filter-title">
                    <Icon name="magic" className="filter-title-icon" />
                    {i18n.t('imagemap.filter.title') || 'Image Filters'}
                </div>

                {/* Toggle Filters */}
                <Card size="small" style={{ marginBottom: 16 }}>
                    <Title level={5} style={{ marginBottom: 12, fontSize: 14 }}>
                        Quick Effects
                    </Title>
                    <Row gutter={[12, 12]}>
                        {filterConfigs.map(filter => {
                            const getCategoryColor = (category) => {
                                switch(category) {
                                    case 'color': return '#1890ff';
                                    case 'vintage': return '#722ed1';
                                    case 'enhancement': return '#52c41a';
                                    default: return '#666';
                                }
                            };
                            
                            const getCategoryIcon = (category) => {
                                switch(category) {
                                    case 'color': return 'palette';
                                    case 'vintage': return 'camera-retro';
                                    case 'enhancement': return 'magic';
                                    default: return 'image';
                                }
                            };
                            
                            return (
                                <Col span={24} key={filter.key}>
                                    <div 
                                        className={`filter-toggle-item ${filters[filter.index] ? 'active' : ''}`}
                                        style={{
                                            borderLeft: `4px solid ${getCategoryColor(filter.category)}`,
                                            position: 'relative'
                                        }}
                                    >
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            gap: '12px'
                                        }}>
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                flex: 1,
                                                minWidth: 0
                                            }}>
                                                <div style={{
                                                    position: 'relative',
                                                    marginRight: '12px',
                                                    flexShrink: 0
                                                }}>
                                                    <Icon 
                                                        name={filter.icon} 
                                                        className="filter-icon"
                                                        style={{ 
                                                            color: filters[filter.index] ? getCategoryColor(filter.category) : '#666',
                                                            fontSize: '16px'
                                                        }} 
                                                    />
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '-2px',
                                                        right: '-2px',
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        backgroundColor: getCategoryColor(filter.category),
                                                        opacity: 0.6
                                                    }} />
                                                </div>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    flex: 1,
                                                    minWidth: 0
                                                }}>
                                                    <span className="filter-label" style={{ 
                                                        color: filters[filter.index] ? getCategoryColor(filter.category) : '#666',
                                                        fontSize: '13px',
                                                        fontWeight: '500',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>
                                                        {filter.label}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        color: '#999',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        {filter.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{ flexShrink: 0 }}>
                                                {getFieldDecorator(`filters.${filter.key}`, {
                                                    valuePropName: 'checked',
                                                    initialValue: !!filters[filter.index],
                                                })(
                                                    <Switch size="small" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Card>

                {/* Slider Filters */}
                <Card size="small" style={{ marginBottom: 16 }}>
                    <Title level={5} style={{ marginBottom: 12, fontSize: 14 }}>
                        Adjustable Effects
                    </Title>
                    {sliderConfigs.map(filter => (
                        <div key={filter.key} className="filter-slider-item">
                            <div className="filter-header">
                                <Icon name={filter.icon} className="filter-icon" />
                                <span className="filter-label">
                                    {filter.label}
                                </span>
                                {getFieldDecorator(`filters.${filter.key}.enabled`, {
                                    valuePropName: 'checked',
                                    initialValue: !!filters[filter.index],
                                })(
                                    <Switch size="small" />
                                )}
                            </div>
                            <div className="filter-slider">
                                {getFieldDecorator(`filters.${filter.key}.${filter.field}`, {
                                    initialValue: filters[filter.index] ? filters[filter.index][filter.field] : filter.defaultValue,
                                })(
                                    <Slider
                                        disabled={!filters[filter.index]}
                                        min={filter.min}
                                        max={filter.max}
                                        step={filter.step}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </Card>

                {/* Drop Shadow Filter */}
                <DropShadowComponent canvasRef={canvasRef} />

                {/* Gamma Filter */}
                <Card size="small">
                    <Title level={5} style={{ marginBottom: 12, fontSize: 14 }}>
                        Color Channels
                    </Title>
                    <div className="filter-header">
                        <Icon name={gammaConfig.icon} className="filter-icon" />
                        <span className="filter-label">
                            {gammaConfig.label}
                        </span>
                        {getFieldDecorator(`filters.${gammaConfig.key}.enabled`, {
                            valuePropName: 'checked',
                            initialValue: !!filters[gammaConfig.index],
                        })(
                            <Switch size="small" />
                        )}
                    </div>
                    <div className="gamma-channels">
                        {gammaConfig.fields.map((field, index) => (
                            <div key={field} className="channel-item">
                                <div className="channel-header">
                                    <div 
                                        className="channel-color"
                                        style={{
                                            backgroundColor: ['#ff4d4f', '#52c41a', '#1890ff'][index]
                                        }}
                                    />
                                    <span className="channel-label">
                                        {gammaConfig.labels[index]}
                                    </span>
                                </div>
                                <div className="channel-slider">
                                    {getFieldDecorator(`filters.${gammaConfig.key}.${field}`, {
                                        initialValue: filters[gammaConfig.index] ? filters[gammaConfig.index].gamma[index] : gammaConfig.defaultValue,
                                    })(
                                        <Slider
                                            disabled={!filters[gammaConfig.index]}
                                            min={gammaConfig.min}
                                            max={gammaConfig.max}
                                            step={gammaConfig.step}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        );
    },
};
