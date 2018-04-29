import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ClientDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // console.log(this.data);
  }
  close() {
    this.dialogRef.close();
  }
}
