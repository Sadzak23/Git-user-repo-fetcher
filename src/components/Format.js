export const formatDate = (date) => {
  const newDate = date.replace(/T/, '-')
  const arr = newDate.split('-')
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return `${months[parseInt(arr[1]) - 1]} ${arr[2]}, ${arr[0]}`
}

export const formatError = (error, setErrorMsg) => {
  switch (error.message) {
    case 'Network Error':
      setErrorMsg('Please check your internet connection')
      break;
    case 'Request failed with status code 422':
      setErrorMsg('Please provide valid name')
      break;
    case 'Request failed with status code 403':
      setErrorMsg('API rate limit exceeded')
      break;
    default:
      setErrorMsg('Unknown error occurred')
      break;
  }
}