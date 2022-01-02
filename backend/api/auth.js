// User Authentication using Firebase Rest API
// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const request = require("request");
const mongoUtil = require("../mongoStart");

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isString(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const requestBody = {
      email: req.body.email,
      password: req.body.password,
    };

    const options = {
      url:
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        process.env.FIREBASEKEY,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    request.post(options, function (err, response) {
      if (err) {
        res.status(400).send(err);
        throw err;
      }

      const result = JSON.parse(response.body);

      if (result.error !== null && result.error !== undefined) {
        res
          .status(result.error.code)
          .send(JSON.stringify({ message: result.error.message }));
        return;
      }
      res.status(200).send(result);
    });
  }
);

function sendEmailVerification(token, res, successResults, isLogin) {
  const emailVerify = {
    requestType: "VERIFY_EMAIL",
    idToken: token,
  };

  const options = {
    url:
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
      process.env.FIREBASEKEY,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailVerify),
  };

  request.post(options, function (err, response) {
    if (err) {
      res.status(400).send(err);
      throw err;
    }
    const result = JSON.parse(response.body);

    if (result.error !== null && result.error !== undefined) {
      res.status(result.error.code).send(result.error.message);
      return;
    }
    if (isLogin) {
      res.status(200).send(successResults);
    } else {
      res.status(200).send("Verification Email Resent");
    }
  });
}
/**
 * Allows a user to create a new account
 */
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isString(),
  body("firstName").isString(),
  body("lastName").isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const requestBody = {
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true,
    };

    const options = {
      url:
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.FIREBASEKEY,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    request.post(options, function (err, response) {
      if (err) {
        res.status(400).send("Registration error: " + err);
        throw err;
      }

      results = JSON.parse(response.body);
      if (results.error !== null && results.error !== undefined) {
        res
          .status(results.error.code)
          .send(JSON.stringify({ message: results.error.message }));
        return;
      }

      const userCredentials = {
        uid: results.localId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      };

      db = mongoUtil.get();
      db.db("project")
        .collection("users")
        .insertOne(userCredentials, function (err, result) {
          if (err) {
            res
              .status(400)
              .send(JSON.stringify({ message: "TRY_AGAIN_LATER" }));
          } else {
            userCredentials._id = result.insertedId;
            userCredentials.refreshToken = results.refreshToken;
            userCredentials.idToken = results.idToken;
            res.status(200).send(userCredentials);
            //   sendEmailVerification(results.idToken, res, response.ops[0], true);
          }
        });
    });
  }
);
/**
 * Allows a user to reset their password
 */
router.post("/emailReset/:email", async (req, res) => {
  const credentials = {
    requestType: "PASSWORD_RESET",
    email: req.params.email,
  };

  if (req.params.email === null || req.params.email === undefined) {
    res.status(400).send(JSON.parse({ message: "INVALID_EMAIL" }));
  }

  const options = {
    url:
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
      process.env.FIREBASEKEY,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  request.post(options, function (err, response) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(JSON.stringify({ firebaseResponse: response.body }));
  });
});

/**
 * Get User
 */
router.get("/getUser/:_id", async (req, res) => {
  db = mongoUtil.get();
  db.db("root")
    .collection("users")
    .find({ _id: ObjectId(req.params._id) })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send(err);
        throw err;
      }
      if (result[0] === undefined || result[0] === null) {
        res.status(400).send("User not Found");
      }
      res.status(200).send(result[0]);
    });
});

// Allows a token to be refreshed
router.post("/refresh/:oldToken", async (req, res) => {
  if (req.params.oldToken === null || req.params.oldToken === undefined) {
    res.status(400).send("invalid token");
  }

  const credentials = {
    grant_type: "refresh_token",
    refresh_token: req.params.oldToken,
  };

  const options = {
    url:
      "https://securetoken.googleapis.com/v1/token?key=" +
      process.env.FIREBASEKEY,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  request.post(options, function (err, response) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(response.body.refreshToken);
  });
});

module.exports = router;
