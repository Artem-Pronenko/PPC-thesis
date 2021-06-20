import firebase from 'firebase'

export const testListItemModel = (testListItem: firebase.firestore.DocumentData) => {
  return {
    id: testListItem?.id,
    idDoc: testListItem.idDoc,
    testDescription: testListItem.testDescription,
    testEndDate: testListItem.testEndDate,
    testName: testListItem.testName,
    type: testListItem.type,
    questions: testListItem.questions,
    forGroup: testListItem.forGroup,
    whoCreated: testListItem.whoCreated,
    isActiveOnExpiration: testListItem.isActiveOnExpiration
  }
}

export const usersTestCompleteModel = (test: firebase.firestore.DocumentData) => {
  return {
    idDoc: test.idDoc,
    completeTest: test.completeTest,
    completeTestId: test.completeTestId,
    timeComplete: test.timeComplete
  }
}

export const usersModel = (users: firebase.firestore.DocumentData) => {
  return {
    idDoc: users.idDoc,
    completeTestId: users.completeTestId.map((item: string) => item),
    displayName: users.displayName,
    group: users.group,
    photoURL: users.photoURL,
  }
}
