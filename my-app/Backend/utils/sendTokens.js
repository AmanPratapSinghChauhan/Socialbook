export const sendToken = (res, user, msg) => {
    const token = user.getJWTToken();

    res.json({
      status: true,
      msg,
      user,
      token,
    });
    console.log('success');
    };