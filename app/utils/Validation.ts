import { z } from "zod";

export const validationSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(6, "パスワードは６文字以上入力してください"),
});

export const validationSignUp = z.object({
  userName: z
    .string()
    .nonempty("ユーザーネームは必須です")
    .min(2, "最低２文字は入力してください"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(6, "パスワードは６文字以上入力してください"),
});
