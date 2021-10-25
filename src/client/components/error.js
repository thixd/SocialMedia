import React, { Component } from 'react';

export default function Error(children) {
    return (
        <div className="error message">
            {children}
        </div>
    );
}