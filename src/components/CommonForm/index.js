import React, { PureComponent, Fragment } from 'react';
import { Form, Button, Row, Col, Icon } from 'antd';
import CreateForm from '@/components/CreateForm';
import { get } from 'lodash';
import PropTypes from 'prop-types';

@Form.create()
class MultiLevelForm extends PureComponent {
  static propTypes = {
    name: PropTypes.string, // 页面有多个多级表单，`name`必须不一样
    data: PropTypes.any,
    form: PropTypes.any,
    formAttr: PropTypes.array,
    onSubmit: PropTypes.func,
  };

  componentWillUnmount() {}

  handleSubmit = e => {
    const { form, onSubmit } = this.props;

    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      onSubmit && onSubmit(values);
    });
  };

  renderForm() {
    const { name, form, formAttr, data } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row type="flex" gutter={32}>
        {formAttr.map(item => {
          const { label, key, valueFunc, defaultValue, ...rest } = item;
          const v = get(data, key);
          const dv = v !== undefined ? (valueFunc ? valueFunc(v) : v) : defaultValue;
          return (
            <Col sm={24} md={12} lg={8} key={`col${item.key}`}>
              <CreateForm getFieldDecorator={getFieldDecorator} name={key} label={label} {...rest} defaultValue={dv} />
            </Col>
          );
        })}
      </Row>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderForm()}

        <div className="text-center" style={{ marginTop: 24 }}>
          <Button htmlType="submit" type="primary" className="btn-form" loading={loading}>
            提交
          </Button>
        </div>
      </Form>
    );
  }
}

export default MultiLevelForm;
