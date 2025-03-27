import { createSelector } from "@reduxjs/toolkit";

const selectAuthState = (state: any) => state.auth;

export const selectCurrentUser = createSelector(
  selectAuthState,
  (auth) => auth.user
);

export const selectAuthStatus = createSelector(
  selectAuthState,
  (auth) => auth.status
);

export const selectAuthError = createSelector(
  selectAuthState,
  (auth) => auth.error
);

export const selectIsAuthenticated = createSelector(
  selectCurrentUser,
  (user) => !!user
);
