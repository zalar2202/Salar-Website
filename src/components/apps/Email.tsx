import React, { useState } from 'react';

const Email: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const emails = [
    {
      id: 1,
      from: 'Salar',
      subject: 'Welcome to Outlook Express',
      date: 'Today',
      body: `Welcome to Salar's email!

My email address is: email@salar.website

Feel free to reach out for any inquiries, collaborations, or just to say hello!

Best regards,
Salar`
    },
    {
      id: 2,
      from: 'Windows XP',
      subject: 'Getting Started',
      date: 'Yesterday',
      body: `Welcome to Windows XP!

This is your email client. You can send and receive messages from here.

Enjoy exploring the classic Windows XP interface!`
    }
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      fontFamily: 'Tahoma, sans-serif',
      fontSize: '11px',
      backgroundColor: '#fff'
    }}>
      {/* Left Panel - Folders */}
      <div style={{
        width: '150px',
        borderRight: '1px solid #ccc',
        padding: '10px',
        backgroundColor: '#E8EEF7'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#0A246A' }}>Folders</div>
        <div style={{ paddingLeft: '10px' }}>
          <div style={{ padding: '3px 0', cursor: 'pointer', fontWeight: 'bold' }}>📥 Inbox (2)</div>
          <div style={{ padding: '3px 0', cursor: 'pointer' }}>📤 Outbox</div>
          <div style={{ padding: '3px 0', cursor: 'pointer' }}>📨 Sent Items</div>
          <div style={{ padding: '3px 0', cursor: 'pointer' }}>🗑️ Deleted Items</div>
          <div style={{ padding: '3px 0', cursor: 'pointer' }}>📝 Drafts</div>
        </div>
      </div>

      {/* Middle Panel - Email List */}
      <div style={{
        width: '280px',
        borderRight: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '8px',
          backgroundColor: '#F1F1F1',
          borderBottom: '1px solid #ccc',
          fontWeight: 'bold'
        }}>
          Inbox
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {emails.map(email => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email.id)}
              style={{
                padding: '8px',
                borderBottom: '1px solid #E5E5E5',
                cursor: 'pointer',
                backgroundColor: selectedEmail === email.id ? '#316AC5' : 'transparent',
                color: selectedEmail === email.id ? 'white' : '#000'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{email.from}</div>
              <div style={{ fontSize: '10px', marginTop: '2px' }}>{email.subject}</div>
              <div style={{ fontSize: '9px', marginTop: '2px', opacity: 0.8 }}>{email.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Email Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff'
      }}>
        {selectedEmail ? (
          <>
            <div style={{
              padding: '10px',
              borderBottom: '1px solid #ccc',
              backgroundColor: '#F7F7F7'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>
                {emails.find(e => e.id === selectedEmail)?.subject}
              </div>
              <div style={{ fontSize: '10px', color: '#666' }}>
                From: {emails.find(e => e.id === selectedEmail)?.from}
              </div>
              <div style={{ fontSize: '10px', color: '#666' }}>
                Date: {emails.find(e => e.id === selectedEmail)?.date}
              </div>
            </div>
            <div style={{
              flex: 1,
              padding: '15px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.5'
            }}>
              {emails.find(e => e.id === selectedEmail)?.body}
            </div>
          </>
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999'
          }}>
            Select an email to read
          </div>
        )}
      </div>
    </div>
  );
};

export default Email;
