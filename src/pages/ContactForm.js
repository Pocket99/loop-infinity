import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 发送 POST 请求到 Flask 后端
    fetch('http://127.0.0.1:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // TODO: 处理响应，例如显示提交成功信息或清空表单

    })
    .catch((error) => {
      console.error('Error:', error);
      // TODO: 处理错误，例如显示提交失败信息
    });

    // 重置表单状态
    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    });
  };


  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-form-container">
      <h2>CONTACT</h2>
      <p>Fill out this form if you need any help or have any general questions!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name (required)</label>
          <input type="text" id="firstName" name="firstName" value={formState.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name (required)</label>
          <input type="text" id="lastName" name="lastName" value={formState.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email Address (required)</label>
          <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="subject">Subject (required)</label>
          <input type="text" id="subject" name="subject" value={formState.subject} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="message">Message (required)</label>
          <textarea id="message" name="message" className="message-box" value={formState.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
