// import {View, StyleSheet} from 'react-native';
// import React, {useState} from 'react';
// import LogInMenu from '../ComponentScreens/LogInMenu';
// import AuthDetails from '../ComponentScreens/AuthDetails';

// export default function Authentication() {
//   const [authPage, setAuthPage] = useState(0);
//   const [detailsPage, setDetailsPage] = useState(false);
//   return (
//     <View style={{marginTop: 30, flex: 1}}>
//       {detailsPage ? (
//         <AuthDetails setDetailsPage={setDetailsPage} />
//       ) : (
//         <LogInMenu
//           authPage={authPage}
//           setAuthPage={setAuthPage}
//           detailsPage={detailsPage}
//           setDetailsPage={setDetailsPage} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 10,
//     padding: 20,
//   },
// });
