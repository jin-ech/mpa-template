import React from 'react';

export interface MessageDomProps {
    message?: string;
    content?: React.ReactChild;
    countdown?: number;
    notificationKey?: any;
    className?: string;
}

export interface DescriptionDomProps {
    description?: React.ReactNode;
}

export type ConfigProps = Omit<MessageDomProps, 'message'> & DescriptionDomProps;

export interface NotificationProps {
    success: (message: string, params?: ConfigProps) => void;
    warning: (message: string, params?: ConfigProps) => void;
    error: (message: string, params?: ConfigProps) => void;
}

export type FunctionName = 'success' | 'warning' | 'error';
