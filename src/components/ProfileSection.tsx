import React, { useState, useRef } from 'react';
import { Card, Avatar, Button, Modal, Input, Upload } from 'antd';
import { EditOutlined, LinkedinOutlined, MoreOutlined, UploadOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface Profile {
  firstName: string;
  lastName: string;
  jobTitle: string;
  headshot: string;
}

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    firstName: 'Jane',
    lastName: 'Cooper',
    jobTitle: 'Product Designer',
    headshot: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256'
  });
  const [tempProfile, setTempProfile] = useState<Profile>(profile);

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageChange = (info: any) => {
    if (info.file.status === 'done') {
      // Normally you would handle the upload to a server here
      // For demo purposes, we're using a FileReader to get a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempProfile(prev => ({
          ...prev,
          headshot: e.target?.result as string
        }));
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const actions = [
    <LinkedinOutlined key="linkedin" style={{ fontSize: '24px' }} />,
    <EditOutlined key="edit" onClick={handleEdit} style={{ fontSize: '24px' }} />,
    <MoreOutlined key="more" style={{ fontSize: '24px' }} />
  ];

  return (
    <>
      <Card
        style={{ width: 300, borderRadius: 16, overflow: 'hidden' }}
        cover={
          <img
            alt="profile cover"
            src={profile.headshot}
            style={{ height: 200, objectFit: 'cover' }}
          />
        }
        actions={actions}
      >
        <Meta
          avatar={
            <Avatar
              src={profile.headshot}
              size={64}
            />
          }
          title={`${profile.firstName} ${profile.lastName}`}
          
          description={profile.jobTitle}
        />
      </Card>

      <Modal
        title="Edit Profile"
        open={isEditing}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Input
              placeholder="First Name"
              value={tempProfile.firstName}
              onChange={e => setTempProfile(prev => ({ ...prev, firstName: e.target.value }))}
            />
            <Input
              placeholder="Last Name"
              value={tempProfile.lastName}
              onChange={e => setTempProfile(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
          <Input
            placeholder="Job Title"
            value={tempProfile.jobTitle}
            onChange={e => setTempProfile(prev => ({ ...prev, jobTitle: e.target.value }))}
          />
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={({ file, onSuccess }: any) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Change Photo</Button>
          </Upload>
        </div>
      </Modal>
    </>
  );
}