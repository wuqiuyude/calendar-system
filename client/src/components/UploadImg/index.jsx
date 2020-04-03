import React, { useState, memo } from "react";
import { Upload, Icon, Modal } from "antd";
import Style from "./style.less";
// upload img component

const UploadImg = memo(
  React.forwardRef((props = { action: "/api/pload/image", multiple: false, max: 1 }, ref) => {
    const { multiple = false, action = "/api/upload/image", max = 1, value } = props;

    const [show, setShow] = useState(false);
    const [imageUrl, setImageUrl] = useState(false);

    const handleChange = info => {
      if (info.file.status === "done") {
        if (multiple) {
          value.push(info.file.response.data);
          props.onChange([...value]);
        } else {
          console.log(111, info.file.response.data);
          props.onChange(info.file.response.data);
        }
      }
    };

    const deleteImg = index => {
      const values = props.value;
      values.splice(index, 1);
      props.onChange([...values]);
    };

    const uploadButton = (
      <div>
        <Icon type='upload'></Icon>
        <div className='ant-upload-text'>上传图片</div>
      </div>
    );

    let fileList = [];
    if (multiple && value) {
      fileList = value;
    }

    if (multiple) {
      return (
        <div>
          {fileList.map((item, index) => (
            <div className={Style["img-card"]} key={item}>
              <Icon type='close' className={Style["img-close"]} onClick={() => deleteImg(index)} />
              <img
                src={item}
                alt=''
                onClick={() => {
                  setShow(true);
                  setImageUrl(item);
                }}
                className={Style["img-image"]}
              />
            </div>
          ))}
          {fileList.length < max ? (
            <Upload
              name='file'
              listType='picture-card'
              className='avatar-uploader'
              action={action}
              showUploadList={false}
              onChange={handleChange}>
              {uploadButton}
            </Upload>
          ) : null}
          <Modal visible={show} onCancel={() => setShow(false)} footer={null} width={600}>
            <div style={{ textAlign: "center" }}>
              <img src={imageUrl || ""} alt='图片' width='500' />
            </div>
          </Modal>
        </div>
      );
    }
    return (
      <div>
        <Upload
          name='file'
          listType='picture-card'
          className='avatar-uploader'
          action={action}
          showUploadList={false}
          onChange={handleChange}
          accept='image/jpeg,image/jpg,image/png'>
          {value ? <img src={value} alt='' width='100%' style={{ maxHeight: "100%" }} /> : uploadButton}
        </Upload>
      </div>
    );
  })
);

export default UploadImg;
