/* eslint-disable no-console */
/// <reference types="cypress"/>
import xlsx from 'node-xlsx';
import fs, { rmdir } from 'fs';
import path from 'path';

require('dotenv').config();

module.exports = (on: Cypress.PluginEvents, config: Cypress.ConfigOptions) => {
  on('task', {
    deleteFolder(folderName) {
      console.log('deleting folder %s', folderName);

      return new Promise((resolve, reject) => {
        rmdir(folderName, { maxRetries: 10, recursive: true }, (err: any) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve(null);
        });
      });
    },
    async extractTextFromXLSX(filePath) {
      const workSheetsFromFile = xlsx.parse(filePath);
      let text = '';

      workSheetsFromFile.forEach(sheet => {
        sheet.data.forEach(row => {
          text += row.join(',') + '\n';
        });
      });

      return text;
    },
    fileExists(folder) {
      const files = fs.readdirSync(folder);
      const regex = new RegExp('.*');

      const foundFile = files.find(file => regex.test(file));
      return foundFile ? path.join(folder, foundFile) : null;
    },
    log(message: any) {
      console.log(message);
    },
  });

  if (!config.env) {
    config.env = {};
  }

  config.env.user_username = process.env.CYPRESS_USER_USERNAME;
  config.env.user_password = process.env.CYPRESS_USER_PASSWORD;

  return config;
};

export {};
