export const email = (emailValue) =>
  !!/^[a-z0-9.+_-]+@[a-z0-9_.-]+?\.[a-z0-9]{2,}$/i.exec(emailValue);
export const password = (passwordValue) => !!/^(.){4,25}$/.exec(passwordValue);
export const login = (loginValue) => !!/^[0-9a-zA-Z-_.]{1,128}$/.exec(loginValue);
export const name = (nameValue) => !!/^[a-z0-9._\-\s\u0400-\u04FF]{3,256}$/i.exec(nameValue);
export const filterName = (value) => value.length >= 3 && value.length <= 128;
export const launchName = (value) => value.length >= 1 && value.length <= 256;
export const launchDescription = (value) => value.length >= 0 && value.length <= 1024;
export const dashboardName = (value) => value.length >= 3 && value.length <= 128;
export const hasPrevilegesForDashboardDeletion = (value) =>
  value === 'ADMINISTRATOR' || value === 'PROJECT_MANAGER';
